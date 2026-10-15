import { useState } from 'react'
import { PageHero } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'

export default function Track() {
  const { db } = useSchool()
  const [id, setId] = useState('')
  const [result, setResult] = useState(undefined)

  function search(e) {
    e.preventDefault()
    const found = db.admissions.find((a) => a.id.toLowerCase() === id.trim().toLowerCase())
    setResult(found || null)
  }

  return (
    <div>
      <PageHero eyebrow="Admissions" title="Track your application" subtitle="Enter the Application ID issued after you submitted the form." />
      <section className="py-16">
        <form onSubmit={search} className="mx-auto max-w-xl px-4 flex gap-2">
          <input
            className="flex-1 border border-cream-dark px-3 py-3"
            placeholder="e.g. JV-2026-1042"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="bg-forest text-white px-5 font-semibold">Track</button>
        </form>
        <div className="mx-auto max-w-xl px-4 mt-8">
          {result === null ? <p className="text-muted">No application found for that ID.</p> : null}
          {result ? (
            <article className="border border-cream-dark p-6">
              <p className="text-xs uppercase tracking-widest text-gold-dark">Application ID</p>
              <h2 className="font-display text-3xl text-forest">{result.id}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><dt className="text-muted">Student</dt><dd className="font-medium">{result.studentName}</dd></div>
                <div><dt className="text-muted">Class</dt><dd className="font-medium">{result.classApplying}</dd></div>
                <div><dt className="text-muted">Submitted</dt><dd className="font-medium">{result.submittedOn}</dd></div>
                <div><dt className="text-muted">Status</dt><dd className="font-semibold text-forest">{result.status}</dd></div>
              </dl>
              <p className="mt-4 text-sm text-muted">Statuses move from Submitted → Under Review → Assessment Scheduled → Admitted / Waitlisted / Not selected.</p>
            </article>
          ) : null}
          <p className="text-xs text-muted mt-6">Try a demo ID: JV-2026-1042</p>
        </div>
      </section>
    </div>
  )
}
