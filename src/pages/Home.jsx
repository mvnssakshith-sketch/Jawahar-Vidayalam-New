import { ArrowRight, Award, BookOpen, CalendarDays, MapPin, Quote, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import Photo from '../components/Photo'
import { GoldButton, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'

export default function Home() {
  const { db } = useSchool()
  const { achievements, facilities, images, programs, school, testimonials, whyChoose } = db.site
  const notices = db.notices.filter((n) => n.audience === 'Public' || n.audience === 'All').slice(0, 4)
  const events = db.events.slice(0, 3)

  return (
    <div>
      <section
        className="relative min-h-[88vh] flex items-center text-white"
        style={{ backgroundImage: `url(${images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-24 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="sun-glow rounded-full p-3 w-fit shrink-0">
              <Logo className="h-28 w-28 md:h-36 md:w-36" light />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-light">
                {school.locationLabel} · Est. {school.established} · {school.board}
              </p>
              <h1 className="font-display text-5xl md:text-7xl mt-3 leading-[0.95] max-w-3xl">
                {school.name}
              </h1>
              <p className="mt-4 text-xl md:text-2xl font-display tracking-[0.12em] uppercase text-gold-light">
                {school.motto}
              </p>
              <p className="mt-4 max-w-xl text-lg text-white/85">{school.home.heroText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton to="/admissions/apply">Apply for Admission</GoldButton>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                >
                  Discover the school <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="brand-stripe absolute inset-x-0 bottom-0" />
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {school.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl text-gold-light">{s.value}</p>
              <p className="text-xs tracking-[0.16em] uppercase text-white/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Photo src={images.campus} alt={`${school.name} campus`} className="rounded-sm h-[420px] w-full object-cover" />
          <div>
            <SectionEyebrow>About the school</SectionEyebrow>
            <SectionTitle>{school.home.aboutTitle}</SectionTitle>
            <p className="mt-5 text-muted leading-relaxed">{school.home.about}</p>
            {school.home.about2 ? <p className="mt-4 text-muted leading-relaxed">{school.home.about2}</p> : null}
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-forest font-semibold">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <SectionEyebrow>Principal’s message</SectionEyebrow>
            <SectionTitle>{school.principal.name}</SectionTitle>
            <p className="text-sm text-gold-dark mt-1">{school.principal.title}, {school.name}</p>
            <Quote className="text-gold mt-6 h-8 w-8" />
            <p className="mt-3 text-lg text-forest leading-relaxed font-display italic">{school.principal.message}</p>
            <Link to="/about" className="mt-6 inline-flex font-semibold text-forest">Full leadership messages →</Link>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-white border border-cream-dark shadow-sm">
              <Photo
                src={images.principal}
                alt={`${school.principal.title} ${school.principal.name}`}
                className="h-full w-full object-cover object-[center_12%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionEyebrow>Why families choose us</SectionEyebrow>
          <SectionTitle>More than a school. A standard.</SectionTitle>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <article key={item.title} className="border border-cream-dark p-6 card-lift bg-white">
                <Star className="h-5 w-5 text-gold" />
                <h3 className="font-display text-2xl text-forest mt-3">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionEyebrow>Academic programmes</SectionEyebrow>
          <h2 className="font-display text-4xl md:text-5xl mt-2">{school.classes}</h2>
          <p className="mt-3 text-white/70 max-w-2xl">Telangana State syllabus with SCERT textbooks. See the full class-wise subject list under Academics → State Syllabus.</p>
          <Link to="/academics/syllabus" className="inline-flex mt-4 text-gold-light font-semibold">View State syllabus →</Link>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {programs.map((p) => (
              <Link key={p.slug} to={`/academics/${p.slug}`} className="bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition">
                <p className="text-xs tracking-[0.2em] uppercase text-gold-light">{p.grades}</p>
                <h3 className="font-display text-2xl mt-2">{p.name}</h3>
                <p className="text-sm text-white/70 mt-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Campus</SectionEyebrow>
              <SectionTitle>Facilities that serve the child</SectionTitle>
            </div>
            <Link to="/facilities" className="hidden sm:inline-flex text-sm font-semibold text-forest">View all →</Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.slice(0, 4).map((f) => (
              <article key={f.name} className="group overflow-hidden">
                <Photo src={f.image} alt={f.name} className="h-48 w-full object-cover group-hover:scale-[1.03] transition" />
                <h3 className="font-display text-xl text-forest mt-3">{f.name}</h3>
                <p className="text-sm text-muted mt-1">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionEyebrow>Notices</SectionEyebrow>
            <SectionTitle>Latest from the school</SectionTitle>
            <div className="mt-8 space-y-4">
              {notices.map((n) => (
                <Link key={n.id} to="/notices" className="block bg-white p-5 border border-cream-dark hover:border-gold">
                  <p className="text-xs text-gold-dark uppercase tracking-wider">{n.category} · {n.date}</p>
                  <h3 className="font-semibold text-forest mt-1">{n.title}</h3>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{n.body}</p>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionEyebrow>Calendar</SectionEyebrow>
            <SectionTitle>Upcoming events</SectionTitle>
            <div className="mt-8 space-y-4">
              {events.map((e) => (
                <Link key={e.id} to={`/events/${e.id}`} className="flex gap-4 bg-white border border-cream-dark p-4 hover:border-gold">
                  <div className="h-16 w-16 bg-forest text-white flex flex-col items-center justify-center shrink-0">
                    <CalendarDays className="h-4 w-4 text-gold" />
                    <span className="text-[11px] mt-1">{e.date.slice(5)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest">{e.name}</h3>
                    <p className="text-sm text-muted">{e.time} · {e.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionEyebrow>Pride of Vidyalayam</SectionEyebrow>
          <SectionTitle>Student achievements</SectionTitle>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {achievements.slice(0, 3).map((a) => (
              <article key={a.title} className="p-6 border border-cream-dark">
                <Award className="text-gold" />
                <p className="text-xs tracking-widest uppercase text-muted mt-3">{a.year} · {a.category}</p>
                <h3 className="font-display text-2xl text-forest mt-2">{a.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionEyebrow>Voices</SectionEyebrow>
          <h2 className="font-display text-4xl mt-2">What families say</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-white/5 p-6 border border-white/10">
                <p className="font-display italic text-lg text-gold-light">“{t.quote}”</p>
                <footer className="mt-4 text-sm">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-white/60">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-end">
            <div>
              <SectionEyebrow>Gallery</SectionEyebrow>
              <SectionTitle>Life on campus</SectionTitle>
            </div>
            <Link to="/gallery" className="text-sm font-semibold text-forest">Open gallery →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {db.gallery.slice(0, 8).map((g) => (
              <Photo key={g.id} src={g.src} alt={g.title} className="h-40 md:h-48 w-full object-cover" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 border border-cream-dark">
            <SectionEyebrow>Find us</SectionEyebrow>
            <SectionTitle>Visit the campus</SectionTitle>
            <p className="mt-4 text-muted">{school.contact.addressLine1}, {school.contact.addressLine2}, {school.contact.city} {school.contact.pincode}</p>
            <p className="mt-2 text-muted flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Office: {school.contact.officeHours}</p>
            <p className="mt-2 text-muted flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" /> Emergency: {school.contact.emergency}</p>
            <Link to="/contact" className="mt-6 inline-flex font-semibold text-forest">Contact & enquiry form →</Link>
          </div>
          <iframe
            title="School location"
            className="w-full min-h-[280px] border-0"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(school.contact.mapQuery)}&z=14&output=embed`}
          />
        </div>
      </section>
    </div>
  )
}
