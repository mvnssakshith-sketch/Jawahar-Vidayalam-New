// Publishes firestore.rules using the local service-account key.
import { readFileSync, readdirSync } from 'node:fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getSecurityRules } from 'firebase-admin/security-rules'

const keyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  readdirSync('.').find((f) => /-firebase-adminsdk-.*\.json$/.test(f))

if (!keyPath) {
  console.error('Service-account key not found. Put the *-firebase-adminsdk-*.json file in the project root.')
  process.exit(1)
}

initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) })
const ruleset = await getSecurityRules().releaseFirestoreRulesetFromSource(readFileSync('firestore.rules', 'utf8'))
console.log(`Firestore rules published: ${ruleset.name}`)
