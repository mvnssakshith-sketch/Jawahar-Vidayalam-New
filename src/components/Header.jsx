import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSite } from '../context/SchoolContext'
import { nav } from '../data/school'
import Logo from './Logo'

function Item({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        onClick={onNavigate}
        className={({ isActive }) =>
          `px-3 py-2 text-sm font-medium rounded-sm ${isActive ? 'text-forest' : 'text-navy hover:text-forest'}`
        }
      >
        {item.label}
      </NavLink>
    )
  }
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="px-3 py-2 text-sm font-medium text-navy inline-flex items-center gap-1 hover:text-forest"
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 min-w-52 rounded-md border border-cream-dark bg-white py-2 shadow-xl">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={() => {
                setOpen(false)
                onNavigate?.()
              }}
              className="block px-4 py-2 text-sm text-navy hover:bg-cream hover:text-forest"
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function Header() {
  const { school } = useSite()
  const [mobile, setMobile] = useState(false)
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-forest-deep text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between gap-4">
          <p className="hidden sm:block tracking-[0.14em] uppercase">
            {school.motto} · {school.locationLabel} · Est. {school.established}
          </p>
          <div className="flex items-center gap-4 ml-auto">
            <a href={`tel:${school.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-gold-light">
              <Phone className="h-3.5 w-3.5 text-gold" /> {school.contact.phone}
            </a>
            <a href={`mailto:${school.contact.email}`} className="hidden md:inline-flex items-center gap-1.5 hover:text-gold-light">
              <Mail className="h-3.5 w-3.5 text-gold" /> {school.contact.email}
            </a>
          </div>
        </div>
      </div>
      <div className="brand-stripe" />
      <div className="bg-white/97 backdrop-blur border-b border-cream-dark">
        <div className="mx-auto max-w-7xl px-4 h-[84px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <Logo className="h-14 w-14 shrink-0" />
            <span className="min-w-0">
              <span className="block font-display text-xl md:text-2xl text-forest leading-none">{school.name}</span>
              <span className="block text-[11px] tracking-[0.18em] uppercase text-navy mt-1">
                {school.locationLabel} · {school.board} · Est. {school.established}
              </span>
            </span>
          </Link>
          <nav className="hidden xl:flex items-center">
            {nav.map((item) => (
              <Item key={item.label} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex rounded-sm bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-navy-mid"
            >
              Portal Login
            </Link>
            <button
              className="xl:hidden p-2 text-forest"
              onClick={() => setMobile((v) => !v)}
              aria-label="Menu"
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobile ? (
          <div className="xl:hidden border-t border-cream-dark bg-white px-4 py-4 space-y-1">
            {nav.flatMap((item) =>
              item.children ? item.children.map((c) => ({ ...c })) : [item],
            ).map((item) => (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                onClick={() => setMobile(false)}
                className="block py-2 text-navy"
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/login" onClick={() => setMobile(false)} className="block py-2 font-semibold text-forest">
              Portal Login
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  )
}
