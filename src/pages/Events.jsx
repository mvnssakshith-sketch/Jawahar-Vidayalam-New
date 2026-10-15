import { Link, useParams } from 'react-router-dom'
import Photo from '../components/Photo'
import { GoldButton, PageHero, SectionTitle } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'
import { images } from '../data/school'

export default function Events() {
  const { id } = useParams()
  const { db, update } = useSchool()
  const events = db.events
  const event = events.find((e) => e.id === id)

  function register(ev) {
    const name = window.prompt('Your name for event registration')
    if (!name) return
    update((d) => {
      d.eventRegistrations.push({
        id: `reg-${Date.now()}`,
        eventId: ev.id,
        name,
        date: new Date().toISOString().slice(0, 10),
      })
      return d
    })
    window.alert('Registration recorded. The events office will confirm by email.')
  }

  if (event) {
    return (
      <div>
        <PageHero eyebrow={event.category} title={event.name} subtitle={`${event.date} · ${event.time} · ${event.location}`} image={event.image} />
        <section className="py-16 mx-auto max-w-3xl px-4">
          <p className="text-lg text-muted leading-relaxed">{event.description}</p>
          {event.registration ? (
            <div className="mt-8">
              <GoldButton type="button" onClick={() => register(event)}>Register interest</GoldButton>
            </div>
          ) : null}
          <Link to="/events" className="block mt-8 font-semibold text-forest">← All events</Link>
        </section>
      </div>
    )
  }

  return (
    <div>
      <PageHero eyebrow="School life" title="Events calendar" subtitle="Annual Day, Sports Day, national days, exhibitions, meetings, and trips." image={images.assembly} />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle>This year’s highlights</SectionTitle>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <Link key={e.id} to={`/events/${e.id}`} className="border border-cream-dark card-lift overflow-hidden bg-white">
                <Photo src={e.image} alt={e.name} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-gold-dark">{e.category} · {e.date}</p>
                  <h3 className="font-display text-2xl text-forest mt-1">{e.name}</h3>
                  <p className="text-sm text-muted mt-2">{e.time} · {e.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
