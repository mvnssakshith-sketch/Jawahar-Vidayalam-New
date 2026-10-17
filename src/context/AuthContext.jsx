import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { clearIndexedDbPersistence, doc, getDoc, terminate } from 'firebase/firestore'
import { auth, firestore } from '../firebase'

const AuthContext = createContext(null)

async function loadProfile(fbUser) {
  const snap = await getDoc(doc(firestore, 'users', fbUser.uid))
  if (!snap.exists()) return null
  return { id: fbUser.uid, email: fbUser.email, ...snap.data() }
}

function authErrorMessage(err) {
  switch (err?.code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.'
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled in Firebase.'
    case 'resource-exhausted':
      return 'The school server has reached its daily usage limit. Please try again later.'
    case 'unavailable':
      return 'Cannot reach the school server. Check your internet connection.'
    default:
      return err?.message || 'Sign-in failed.'
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      onAuthStateChanged(auth, async (fbUser) => {
        if (!fbUser) {
          setUser(null)
          setLoading(false)
          return
        }
        try {
          const profile = await loadProfile(fbUser)
          if (!profile) await signOut(auth)
          setUser(profile)
        } catch {
          setUser(null)
        }
        setLoading(false)
      }),
    [],
  )

  const api = useMemo(
    () => ({
      user,
      loading,
      async login(email, password) {
        try {
          const cred = await signInWithEmailAndPassword(auth, email.trim(), password)
          const profile = await loadProfile(cred.user)
          if (!profile) {
            await signOut(auth)
            return { ok: false, error: 'This account has no portal access. Contact the school office.' }
          }
          setUser(profile)
          navigate(`/portal/${profile.role}`)
          return { ok: true, user: profile }
        } catch (err) {
          return { ok: false, error: authErrorMessage(err) }
        }
      },
      async logout() {
        await signOut(auth)
        try {
          await terminate(firestore)
          await clearIndexedDbPersistence(firestore)
        } catch {
          /* cache is cleared on a best-effort basis */
        }
        window.location.assign('/login')
      },
    }),
    [loading, navigate, user],
  )

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
