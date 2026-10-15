import { createContext, useContext, useMemo, useState } from 'react'
import { loadDb, resetDb, saveDb } from '../data/store'

const SchoolContext = createContext(null)

export function SchoolProvider({ children }) {
  const [db, setDb] = useState(() => loadDb())

  const api = useMemo(
    () => ({
      db,
      update(mutator) {
        const next = mutator(structuredClone(loadDb()))
        saveDb(next)
        setDb(next)
        return next
      },
      reset() {
        const next = resetDb()
        setDb(next)
        return next
      },
    }),
    [db],
  )

  return <SchoolContext.Provider value={api}>{children}</SchoolContext.Provider>
}

export function useSchool() {
  const ctx = useContext(SchoolContext)
  if (!ctx) throw new Error('useSchool must be used inside SchoolProvider')
  return ctx
}
