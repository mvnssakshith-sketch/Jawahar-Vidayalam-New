import { PageHero, SectionTitle } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'

export default function Transport() {
  const { db } = useSchool()
  const { images } = db.site
  return (
    <div>
      <PageHero
        eyebrow="Transport"
        title="Safe routes to campus"
        subtitle="Numbered buses, published stops, trained drivers. Live GPS can be enabled for parent accounts in a later phase."
        image={images.bus}
      />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle>Current routes</SectionTitle>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {db.busRoutes.map((r) => (
              <article key={r.id} className="border border-cream-dark p-6">
                <p className="text-xs uppercase tracking-widest text-gold-dark">{r.id} · Bus {r.busNo}</p>
                <h3 className="font-display text-2xl text-forest mt-1">{r.name}</h3>
                <p className="text-sm text-muted mt-2">Driver: {r.driver} · {r.driverPhone}</p>
                <p className="text-sm mt-1">Timings: {r.timing}</p>
                <p className="text-sm mt-3 text-forest">{r.stops.join(' → ')}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted max-w-2xl">
            Student–bus allocation is managed in the admin portal. Parents see the assigned route on the child profile. GPS live tracking is designed as an integration with the vehicle tracker vendor.
          </p>
        </div>
      </section>
    </div>
  )
}
