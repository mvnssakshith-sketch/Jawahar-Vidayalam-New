import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { collection, doc, getDoc, onSnapshot, writeBatch } from 'firebase/firestore'
import { firestore } from '../firebase'
import { withSiteDefaults } from '../data/site'
import { COLLECTIONS, DEFAULT_SETTINGS, PUBLIC_COLLECTIONS, collectionsFor, emptyDb, seedCollections } from '../data/store'
import { useAuth } from './AuthContext'

const SchoolContext = createContext(null)
const SETTINGS_REF = () => doc(firestore, 'meta', 'settings')
const SITE_REF = () => doc(firestore, 'meta', 'site')
const BATCH_LIMIT = 450
const QUOTA_MESSAGE = 'The school server has reached its daily usage limit. Some information may be missing — please try again later.'

function errorMessage(err) {
  if (err?.code === 'resource-exhausted') return QUOTA_MESSAGE
  if (err?.code === 'permission-denied') return 'You do not have permission to make this change.'
  return 'Could not save to the server. Please check your connection and try again.'
}

function byOrder(a, b) {
  return (a._order ?? 0) - (b._order ?? 0)
}

function deepEqual(a, b) {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a)
  const kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every((k) => deepEqual(a[k], b[k]))
}

function orderFor(list, i) {
  const before = list[i - 1]?._order
  const after = list[i + 1]?._order
  if (before !== undefined && after !== undefined) return (before + after) / 2
  if (after !== undefined) return after - 1
  if (before !== undefined) return before + 1
  return -Date.now()
}

// Works out the Firestore writes needed to turn `prev` into `next`.
function diffDb(prev, next) {
  const ops = []
  for (const name of COLLECTIONS) {
    const before = new Map((prev[name] || []).map((r) => [r.id, r]))
    const list = next[name] || []
    const kept = new Set()
    list.forEach((row, i) => {
      kept.add(row.id)
      const old = before.get(row.id)
      if (row._order === undefined) row._order = old?._order ?? orderFor(list, i)
      if (old && deepEqual(old, row)) return
      const { id, ...data } = row
      ops.push({ type: 'set', ref: doc(firestore, name, id), data })
    })
    for (const id of before.keys()) {
      if (!kept.has(id)) ops.push({ type: 'delete', ref: doc(firestore, name, id) })
    }
  }
  if (!deepEqual(prev.settings, next.settings)) {
    ops.push({ type: 'set', ref: SETTINGS_REF(), data: next.settings })
  }
  if (next.site && !deepEqual(prev.site, next.site)) {
    ops.push({ type: 'set', ref: SITE_REF(), data: next.site })
  }
  return ops
}

async function commit(ops) {
  for (let i = 0; i < ops.length; i += BATCH_LIMIT) {
    const batch = writeBatch(firestore)
    for (const op of ops.slice(i, i + BATCH_LIMIT)) {
      if (op.type === 'delete') batch.delete(op.ref)
      else batch.set(op.ref, op.data)
    }
    await batch.commit()
  }
}

export function SchoolProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id
  const role = user?.role
  const [db, setDb] = useState(emptyDb)
  const [ready, setReady] = useState(false)
  const [syncError, setSyncError] = useState('')
  const dbRef = useRef(db)

  useEffect(() => {
    dbRef.current = db
  }, [db])

  useEffect(() => {
    const names = userId ? collectionsFor(role) : PUBLIC_COLLECTIONS
    const pending = new Set([...names, 'settings', 'site'])
    const loaded = (name, err) => {
      if (err) {
        console.error(`Firestore: could not load "${name}"`, err)
        if (err.code === 'resource-exhausted') setSyncError(QUOTA_MESSAGE)
      }
      pending.delete(name)
      if (pending.size === 0) setReady(true)
    }
    const fresh = { ...emptyDb(), settings: dbRef.current.settings, site: dbRef.current.site }
    dbRef.current = fresh
    setDb(fresh)
    setReady(false)

    const unsubs = names.map((name) =>
      onSnapshot(
        collection(firestore, name),
        (snap) => {
          const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort(byOrder)
          setDb((prev) => ({ ...prev, [name]: rows }))
          loaded(name)
        },
        (err) => loaded(name, err),
      ),
    )
    unsubs.push(
      onSnapshot(
        SETTINGS_REF(),
        (snap) => {
          setDb((prev) => ({ ...prev, settings: { ...DEFAULT_SETTINGS, ...(snap.data() || {}) } }))
          loaded('settings')
        },
        (err) => loaded('settings', err),
      ),
      onSnapshot(
        SITE_REF(),
        (snap) => {
          setDb((prev) => ({ ...prev, site: withSiteDefaults(snap.data()) }))
          loaded('site')
        },
        (err) => loaded('site', err),
      ),
    )
    return () => unsubs.forEach((u) => u())
  }, [userId, role])

  const persist = useCallback((ops) => {
    if (!ops.length) return Promise.resolve()
    setSyncError('')
    return commit(ops).catch((err) => {
      console.error('Firestore write failed', err)
      setSyncError(errorMessage(err))
      throw err
    })
  }, [])

  const update = useCallback(
    (mutator) => {
      const prev = dbRef.current
      const next = mutator(structuredClone(prev)) || prev
      const ops = diffDb(prev, next)
      dbRef.current = next
      setDb(next)
      return persist(ops).then(
        () => true,
        () => false,
      )
    },
    [persist],
  )

  const reset = useCallback(() => {
    const seed = seedCollections()
    const ops = diffDb(dbRef.current, seed)
    return persist(ops).catch(() => {})
  }, [persist])

  const findApplication = useCallback(async (rawId) => {
    const id = rawId.trim().toUpperCase()
    if (!id) return null
    const local = dbRef.current.admissions.find((a) => a.id.toUpperCase() === id)
    if (local) return local
    try {
      const snap = await getDoc(doc(firestore, 'admissions', id))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch {
      return null
    }
  }, [])

  const api = useMemo(
    () => ({ db, ready, syncError, update, reset, findApplication }),
    [db, ready, syncError, update, reset, findApplication],
  )

  return (
    <SchoolContext.Provider value={api}>
      {children}
      {syncError ? (
        <div role="alert" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-red-700 text-white text-sm px-4 py-3 shadow-lg flex items-center gap-4">
          {syncError}
          <button type="button" className="font-semibold underline" onClick={() => setSyncError('')}>
            Dismiss
          </button>
        </div>
      ) : null}
    </SchoolContext.Provider>
  )
}

export function useSchool() {
  const ctx = useContext(SchoolContext)
  if (!ctx) throw new Error('useSchool must be used inside SchoolProvider')
  return ctx
}

export function useSite() {
  return useSchool().db.site
}
