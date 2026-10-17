import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { school } from '../data/school'
import { DEMO_ACCOUNTS } from '../data/store'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await login(email, password)
    if (!res.ok) {
      setError(res.error)
      setBusy(false)
    }
  }

  return (
    <div className="min-h-svh grid lg:grid-cols-2">
      <div
        className="hidden lg:flex flex-col justify-end p-12 text-white relative"
        style={{ backgroundImage: 'url(/images/campus.jpg)', backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative">
          <Logo className="h-24 w-24" light />
          <p className="text-xs tracking-[0.28em] uppercase text-gold-light mt-6">{school.motto}</p>
          <h1 className="font-display text-5xl mt-3 max-w-md">{school.name}</h1>
          <p className="mt-3 text-white/75 max-w-sm">{school.locationLabel} · Est. {school.established} · Admin, teacher, parent & student portals.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-cream">
        <div className="w-full max-w-md bg-white p-8 shadow-xl">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-14 w-14" />
            <span>
              <span className="block font-display text-2xl text-forest leading-none">{school.name}</span>
              <span className="block text-[11px] tracking-[0.16em] uppercase text-navy mt-1">{school.locationLabel}</span>
            </span>
          </Link>
          <h2 className="mt-8 font-display text-3xl text-navy">Portal login</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input className="w-full border border-cream-dark px-3 py-2.5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full border border-cream-dark px-3 py-2.5" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button className="w-full bg-forest text-white py-2.5 font-semibold disabled:opacity-60" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-muted">Demo accounts — click to fill</p>
            <div className="mt-3 grid gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setEmail(a.email)
                    setPassword(a.password)
                    setError('')
                  }}
                  className="text-left text-sm border border-cream-dark px-3 py-2 hover:bg-cream"
                >
                  <span className="font-semibold text-forest">{a.label}</span>
                  <span className="block text-muted">{a.email} / {a.password}</span>
                </button>
              ))}
            </div>
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-forest">← Back to website</Link>
        </div>
      </div>
    </div>
  )
}
