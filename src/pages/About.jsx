import { PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import {
  accreditations,
  achievements,
  coreValues,
  facultyHighlights,
  images,
  school,
} from '../data/school'

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="History, vision, and the people who keep the promise."
        subtitle={`${school.legalName} · Established ${school.established} · ${school.board}`}
        image={images.campus}
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionEyebrow>Our story</SectionEyebrow>
            <SectionTitle>A school named for a larger idea of India</SectionTitle>
            <p className="mt-5 text-muted leading-relaxed">
              Jawahar Vidyalayam opened its gates in {school.established} at Aswaraopet with a handful of classrooms and the motto {school.motto} — Knowledge, Humility, Wisdom. We believe children deserve both high standards and a kind adult in the room.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Over the years we have grown into a full senior secondary school — Nursery to Class XII — without losing the feeling of a place where teachers still walk the corridors after the last bell. Our alumni sit in universities, studios, laboratories, and public service. We measure ourselves by the adults they become.
            </p>
          </div>
          <img src={images.assembly} alt="School assembly" className="h-full min-h-[320px] object-cover rounded-sm" />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
          <article className="bg-white p-8 border border-cream-dark">
            <SectionEyebrow>Vision</SectionEyebrow>
            <h3 className="font-display text-3xl text-forest mt-2">To raise thoughtful citizens</h3>
            <p className="mt-4 text-muted leading-relaxed">
              We envision a school where every child is known, challenged, and trusted — prepared for board examinations and for a life of contribution.
            </p>
          </article>
          <article className="bg-white p-8 border border-cream-dark">
            <SectionEyebrow>Mission</SectionEyebrow>
            <h3 className="font-display text-3xl text-forest mt-2">Excellence with empathy</h3>
            <p className="mt-4 text-muted leading-relaxed">
              Deliver Telangana State Board academics of the highest quality, cultivate character through daily practice, and partner with families in the education of the whole child.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Core values</SectionEyebrow>
          <SectionTitle>What we practise when it is inconvenient</SectionTitle>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v) => (
              <article key={v.name} className="p-6 border border-cream-dark">
                <h3 className="font-display text-2xl text-forest">{v.name}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-deep text-white py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10">
          <article>
            <div className="mx-auto w-full max-w-sm aspect-[3/4] overflow-hidden rounded-sm bg-white">
              <img
                src={images.principal}
                alt="Principal Inuganti Mythali"
                className="h-full w-full object-cover object-[center_12%]"
              />
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold-light mt-4">Principal’s message</p>
            <h3 className="font-display text-3xl mt-1">{school.principal.name}</h3>
            <p className="text-white/70 text-sm">{school.principal.title}</p>
            <p className="mt-4 text-white/85 leading-relaxed">{school.principal.message}</p>
          </article>
          <article>
            <div className="mx-auto w-full max-w-sm aspect-[3/4] overflow-hidden rounded-sm bg-white">
              <img
                src={images.chairman}
                alt="Managing Director Inuganti Praveen Kumar"
                className="h-full w-full object-cover object-[center_18%]"
              />
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold-light mt-4">Managing Director’s message</p>
            <h3 className="font-display text-3xl mt-1">{school.chairman.name}</h3>
            <p className="text-white/70 text-sm">{school.chairman.title}</p>
            <p className="mt-4 text-white/85 leading-relaxed">{school.chairman.message}</p>
          </article>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Recognition</SectionEyebrow>
          <SectionTitle>Achievements, affiliations, awards</SectionTitle>
          <ul className="mt-6 space-y-2 text-muted">
            {accreditations.map((a) => (
              <li key={a}>— {a}</li>
            ))}
          </ul>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.title} className="flex gap-4 border border-cream-dark p-4">
                <span className="text-gold-dark font-semibold">{a.year}</span>
                <div>
                  <p className="font-medium text-forest">{a.title}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">{a.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Faculty</SectionEyebrow>
          <SectionTitle>Teachers who stay with the work</SectionTitle>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facultyHighlights.map((f) => (
              <article key={f.name} className="bg-white overflow-hidden border border-cream-dark">
                <div className="aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="h-full w-full object-cover object-[center_15%]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest">{f.name}</h3>
                  <p className="text-sm text-gold-dark mt-1">{f.role}</p>
                  <p className="text-sm text-muted mt-2">{f.subject}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
