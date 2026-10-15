import { useState } from 'react'
import { GoldButton, PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'
import { images, school } from '../data/school'

export default function Contact() {
  const { update } = useSchool()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'General' })

  function submit(e) {
    e.preventDefault()
    update((db) => {
      db.contacts.push({ id: `ct-${Date.now()}`, ...form, date: new Date().toISOString() })
      db.enquiries.push({ id: `eq-${Date.now()}`, ...form, date: new Date().toISOString().slice(0, 10) })
      return db
    })
    setSent(true)
  }

  return (
    <div>
      <PageHero eyebrow="Contact" title="We are here through the week" subtitle={school.contact.officeHours} image={images.campus} />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionEyebrow>Reach us</SectionEyebrow>
            <SectionTitle>Office, principal, emergency</SectionTitle>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Address</dt>
                <dd className="text-forest font-medium">{school.contact.addressLine1}, {school.contact.addressLine2}, {school.contact.city}, {school.contact.state} {school.contact.pincode}</dd>
              </div>
              <div>
                <dt className="text-muted">Office</dt>
                <dd>{school.contact.officePhone} · {school.contact.email}</dd>
              </div>
              <div>
                <dt className="text-muted">Admissions</dt>
                <dd>{school.contact.phone} · {school.contact.admissionsEmail}</dd>
              </div>
              <div>
                <dt className="text-muted">Principal’s office</dt>
                <dd>{school.contact.principalPhone}</dd>
              </div>
              <div>
                <dt className="text-muted">Emergency</dt>
                <dd className="font-semibold">{school.contact.emergency}</dd>
              </div>
            </dl>
            <iframe
              title="Map"
              className="mt-8 w-full h-64 border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(school.contact.mapQuery)}&z=14&output=embed`}
            />
          </div>
          <div className="border border-cream-dark p-8">
            <h3 className="font-display text-3xl text-forest">Write to us</h3>
            {sent ? (
              <p className="mt-6 text-muted">Thank you. The office will respond during working hours.</p>
            ) : (
              <form onSubmit={submit} className="mt-6 grid gap-4">
                <select className="border border-cream-dark px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option>General</option>
                  <option>Admission enquiry</option>
                  <option>Transport</option>
                  <option>Fees</option>
                  <option>Academic</option>
                </select>
                <input required placeholder="Name" className="border border-cream-dark px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required type="email" placeholder="Email" className="border border-cream-dark px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input required placeholder="Phone" className="border border-cream-dark px-3 py-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <textarea required placeholder="Message" className="border border-cream-dark px-3 py-2 min-h-32" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <GoldButton type="submit">Send message</GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
