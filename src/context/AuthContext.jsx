import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSchool } from './SchoolContext'

const AuthContext = createContext(null)
const SESSION_KEY = 'jv_session_user'

export function AuthProvider({ children }) {
  const { db } = useSchool()
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
    } catch {
      return null
    }
  })

  const api = useMemo(
    () => ({
      user,
      login(email, password) {
        const found = db.users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
        )
        if (!found) return { ok: false, error: 'Invalid email or password.' }
        const session = { ...found }
        delete session.password
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
        setUser(session)
        navigate(`/portal/${found.role}`)
        return { ok: true, user: session }
      },
      logout() {
        sessionStorage.removeItem(SESSION_KEY)
        setUser(null)
        navigate('/login')
      },
    }),
    [db.users, navigate, user],
  )

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
