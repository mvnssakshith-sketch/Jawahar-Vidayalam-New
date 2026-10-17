// One-time setup: creates portal login accounts and loads demo school data into Firestore.
// Runs locally with the service-account key; the key must never be bundled into the website.
//
//   npm run seed            seed only if Firestore is empty
//   npm run seed -- --force overwrite school data with the demo data
import { readFileSync, readdirSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { DEFAULT_SITE } from '../src/data/site.js'
import { COLLECTIONS, buildSeed, seedCollections } from '../src/data/store.js'

const force = process.argv.includes('--force')
const keyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  readdirSync('.').find((f) => /-firebase-adminsdk-.*\.json$/.test(f))

if (!keyPath) {
  console.error('Service-account key not found. Put the *-firebase-adminsdk-*.json file in the project root.')
  process.exit(1)
}

initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
const auth = getAuth()
const db = getFirestore()

async function ensureUser({ email, password, name }) {
  try {
    const existing = await auth.getUserByEmail(email)
    await auth.updateUser(existing.uid, { password, displayName: name })
    return existing.uid
  } catch (err) {
    if (err.code !== 'auth/user-not-found') throw err
    const created = await auth.createUser({ email, password, displayName: name })
    return created.uid
  }
}

async function seedUsers() {
  for (const u of buildSeed().users) {
    const { id: _legacyId, password, ...profile } = u
    const uid = await ensureUser({ email: u.email, password, name: u.name })
    await db.doc(`users/${uid}`).set(profile)
    console.log(`  login ready: ${u.email} (${u.role})`)
  }
}

async function seedData() {
  const settingsRef = db.doc('meta/settings')
  if (!force && (await settingsRef.get()).exists) {
    console.log('  school data already present; skipping (use --force to overwrite)')
    return
  }
  const seed = seedCollections()
  const writer = db.bulkWriter()
  for (const name of COLLECTIONS) {
    if (force) {
      const existing = await db.collection(name).listDocuments()
      existing.forEach((ref) => writer.delete(ref))
    }
    for (const { id, ...data } of seed[name]) writer.set(db.doc(`${name}/${id}`), data)
    console.log(`  ${name}: ${seed[name].length}`)
  }
  writer.set(settingsRef, seed.settings)
  await writer.close()
}

async function seedSite() {
  const ref = db.doc('meta/site')
  if (!force && (await ref.get()).exists) {
    console.log('  website content already present; skipping (use --force to overwrite)')
    return
  }
  await ref.set(DEFAULT_SITE)
  console.log('  website content uploaded')
}

console.log('Loading school data…')
await seedData()
console.log('Loading website content…')
await seedSite()
console.log('Creating portal logins…')
try {
  await seedUsers()
} catch (err) {
  if (err.code !== 'auth/configuration-not-found') throw err
  console.error(
    '\nFirebase Authentication is not set up yet.\n' +
      'Open https://console.firebase.google.com/project/jawahar-vidayalam/authentication,\n' +
      'click "Get started", enable "Email/Password", then run `npm run seed` again.',
  )
  process.exit(1)
}
console.log('Done.')
