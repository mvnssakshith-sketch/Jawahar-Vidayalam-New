import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoldButton, PageHero } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'

const classes = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X']

export default function Apply() {
  const { db, update } = useSchool()
  const { images } = db.site
  const { academicYear, admissionsOpen } = db.settings
  const [submitted, setSubmitted] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    studentName: '',
    dob: '',
    gender: 'Male',
    classApplying: 'Nursery',
    previousSchool: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    documents: '',
  })

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    const id = `JV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
    const saved = await update((db) => {
      db.admissions.unshift({
        id,
        ...form,
        documents: form.documents ? form.documents.split(',').map((s) => s.trim()) : [],
        status: 'Submitted',
        submittedOn: new Date().toISOString().slice(0, 10),
      })
      return db
    })
    setSaving(false)
    if (saved) setSubmitted(id)
  }

  if (!admissionsOpen) {
    return (
      <div>
        <PageHero eyebrow="Online application" title="Admissions are closed" image={images.kids} />
        <section className="py-16">
          <div className="mx-auto max-w-xl px-4 text-center border border-cream-dark p-10">
            <p className="text-muted">Online applications for {academicYear} are not being accepted right now. Please contact the school office for details.</p>
            <div className="mt-8 flex justify-center gap-3">
              <GoldButton to="/contact">Contact the office</GoldButton>
              <Link to="/admissions/track" className="px-5 py-2.5 text-sm font-semibold text-forest">Track an application</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (submitted) {
    return (
      <div>
        <PageHero eyebrow="Application received" title="Your Application ID is ready." />
        <section className="py-16">
          <div className="mx-auto max-w-xl px-4 text-center border border-cream-dark p-10">
            <p className="text-sm text-muted">Please save this ID for tracking and office correspondence.</p>
            <p className="font-display text-4xl text-forest mt-4">{submitted}</p>
            <p className="mt-4 text-muted">Status: Submitted. The admissions office will contact you for interaction dates.</p>
            <div className="mt-8 flex justify-center gap-3">
              <GoldButton to="/admissions/track">Track application</GoldButton>
              <Link to="/" className="px-5 py-2.5 text-sm font-semibold text-forest">Back home</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <PageHero
        eyebrow="Online application"
        title="Begin the admission form"
        subtitle="All fields marked with * are required. You will receive an Application ID immediately after submit."
        image={images.kids}
      />
      <section className="py-16">
        <form onSubmit={submit} className="mx-auto max-w-3xl px-4 grid sm:grid-cols-2 gap-5">
          <Field label="Student name *" value={form.studentName} onChange={(v) => set('studentName', v)} required />
          <Field label="Date of birth *" type="date" value={form.dob} onChange={(v) => set('dob', v)} required />
          <label className="text-sm">
            Gender *
            <select className="mt-1 w-full border border-cream-dark px-3 py-2" value={form.gender} onChange={(e) => set('gender', e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label className="text-sm">
            Class applying for *
            <select className="mt-1 w-full border border-cream-dark px-3 py-2" value={form.classApplying} onChange={(e) => set('classApplying', e.target.value)}>
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <Field label="Previous school" value={form.previousSchool} onChange={(v) => set('previousSchool', v)} />
          <Field label="Parent / guardian name *" value={form.parentName} onChange={(v) => set('parentName', v)} required />
          <Field label="Phone number *" value={form.phone} onChange={(v) => set('phone', v)} required />
          <Field label="Email *" type="email" value={form.email} onChange={(v) => set('email', v)} required />
          <label className="text-sm sm:col-span-2">
            Address *
            <textarea required className="mt-1 w-full border border-cream-dark px-3 py-2 min-h-24" value={form.address} onChange={(e) => set('address', e.target.value)} />
          </label>
          <label className="text-sm sm:col-span-2">
            Documents uploaded (names, comma separated)
            <input className="mt-1 w-full border border-cream-dark px-3 py-2" placeholder="Birth certificate, photos, Aadhaar..." value={form.documents} onChange={(e) => set('documents', e.target.value)} />
            <span className="text-xs text-muted">In production, files would go to secure cloud storage. This demo records document names.</span>
          </label>
          <div className="sm:col-span-2">
            <GoldButton type="submit" disabled={saving}>{saving ? 'Submitting…' : 'Submit application'}</GoldButton>
            <p className="text-xs text-muted mt-3">A copy is stored for the admissions office. You will receive an Application ID (format JV-{new Date().getFullYear()}-XXXXXX) to track your application.</p>
          </div>
        </form>
      </section>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return (
    <label className="text-sm">
      {label}
      <input
        required={required}
        type={type}
        className="mt-1 w-full border border-cream-dark px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
