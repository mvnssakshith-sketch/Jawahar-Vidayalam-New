import { Globe, Mail, MapPin, Phone, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SchoolContext'
import Logo from './Logo'

export default function Footer() {
  const { school } = useSite()
  return (
    <footer className="bg-forest-deep text-white">
      <div className="brand-stripe" />
      <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-16 w-16" light />
            <div>
              <p className="font-display text-2xl leading-none">{school.name}</p>
              <p className="text-[11px] tracking-[0.16em] uppercase text-gold-light mt-1">{school.motto}</p>
              <p className="text-[11px] text-white/60 mt-1">{school.locationLabel} · Est. {school.established}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            A Telangana State Board school offering {school.classes}. {school.mottoMeaning}.
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl text-gold-light">Explore</h3>
          <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/80">
            <Link to="/about" className="hover:text-gold-light">About the school</Link>
            <Link to="/admissions" className="hover:text-gold-light">Admissions</Link>
            <Link to="/academics" className="hover:text-gold-light">Academics</Link>
            <Link to="/academics/syllabus" className="hover:text-gold-light">State Syllabus</Link>
            <Link to="/facilities" className="hover:text-gold-light">Facilities</Link>
            <Link to="/gallery" className="hover:text-gold-light">Gallery</Link>
            <Link to="/transport" className="hover:text-gold-light">Transport</Link>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-gold-light">Portals</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/80">
            <Link to="/login" className="hover:text-gold-light">Student login</Link>
            <Link to="/login" className="hover:text-gold-light">Parent login</Link>
            <Link to="/login" className="hover:text-gold-light">Teacher login</Link>
            <Link to="/login" className="hover:text-gold-light">Admin dashboard</Link>
            <Link to="/admissions/apply" className="hover:text-gold-light">Apply online</Link>
            <Link to="/admissions/track" className="hover:text-gold-light">Track application</Link>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-gold-light">Visit us</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />{school.contact.addressLine1}, {school.contact.city}, {school.contact.state} {school.contact.pincode}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" />{school.contact.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />{school.contact.email}</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href={school.social.facebook} className="p-2 rounded-full border border-white/20 hover:bg-white/10" aria-label="Facebook"><Globe className="h-4 w-4" /></a>
            <a href={school.social.instagram} className="p-2 rounded-full border border-white/20 hover:bg-white/10" aria-label="Instagram"><Globe className="h-4 w-4" /></a>
            <a href={school.social.youtube} className="p-2 rounded-full border border-white/20 hover:bg-white/10" aria-label="YouTube"><Play className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/50 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {school.legalName}. All rights reserved.</p>
          <p>{school.motto} · State Syllabus · Est. {school.established}</p>
        </div>
      </div>
    </footer>
  )
}
