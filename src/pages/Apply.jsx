import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoldButton, PageHero } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'
import { images } from '../data/school'
import { uid } from '../data/store'

const classes = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII']

export default function Apply() {
  const { update } = useSchool()
  const [submitted, setSubmitted] = useState(null)
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

  function submit(e) {
    e.preventDefault()
    const id = `JV-2026-${String(Math.floor(1000 + Math.random() * 9000))}`
    update((db) => {
      db.admissions.unshift({
        id,
        ...form,
        documents: form.documents ? form.documents.split(',').map((s) => s.trim()) : [],
        status: 'Submitted',
        submittedOn: new Date().toISOString().slice(0, 10),
      })
      return db
    })
    setSubmitted(id)
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
            <GoldButton type="submit">Submit application</GoldButton>
            <p className="text-xs text-muted mt-3">A copy is stored for the admissions office. Application ID format: JV-2026-XXXX. Ref {uid('ref')}</p>
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
