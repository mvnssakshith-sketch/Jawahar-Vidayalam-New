import { PageHero } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'

export default function Notices() {
  const { db } = useSchool()
  const { images } = db.site
  const publicNotices = db.notices.filter((n) => n.audience === 'Public' || n.audience === 'All')

  return (
    <div>
      <PageHero eyebrow="Announcements" title="School notices" subtitle="Holidays, examinations, admissions, meetings, and emergency circulars." image={images.assembly} />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-4">
          {publicNotices.map((n) => (
            <article key={n.id} className="border border-cream-dark p-6">
              <p className="text-xs uppercase tracking-widest text-gold-dark">{n.category} · {n.date} · {n.audience}</p>
              <h2 className="font-display text-2xl text-forest mt-1">{n.title}</h2>
              <p className="mt-2 text-muted">{n.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
