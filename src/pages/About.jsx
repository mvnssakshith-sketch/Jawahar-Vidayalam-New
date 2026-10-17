import { PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import { useSite } from '../context/SchoolContext'

export default function About() {
  const { accreditations, achievements, coreValues, facultyHighlights, images, school } = useSite()
  const about = school.about
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="History, vision, and the people who keep the promise."
        subtitle={`${school.legalName} · Established ${school.established} · ${school.board}`}
        image={images.campus}
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionEyebrow>Our story</SectionEyebrow>
            <SectionTitle>{about.storyTitle}</SectionTitle>
            <p className="mt-5 text-muted leading-relaxed">{about.story}</p>
            {about.story2 ? <p className="mt-4 text-muted leading-relaxed">{about.story2}</p> : null}
          </div>

          <div className="space-y-6 lg:justify-self-end w-full max-w-md">
            <article className="bg-forest-deep text-white p-5 border border-cream-dark shadow-sm">
              <div className="mx-auto mb-4 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-sm bg-white">
                <img
                  src={images.founder}
                  alt={school.founder.name}
                  className="h-full w-full object-cover object-[center_15%]"
                />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold-light">Founder</p>
              <h3 className="font-display text-3xl mt-2">{school.founder.name}</h3>
              <p className="text-white/75 text-sm mt-1">{school.founder.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/85">{school.founder.message}</p>
            </article>

            <img src={images.assembly} alt="School assembly" className="h-full min-h-[240px] w-full object-cover rounded-sm" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
          <article className="bg-white p-8 border border-cream-dark">
            <SectionEyebrow>Vision</SectionEyebrow>
            <h3 className="font-display text-3xl text-forest mt-2">{about.visionTitle}</h3>
            <p className="mt-4 text-muted leading-relaxed">{about.vision}</p>
          </article>
          <article className="bg-white p-8 border border-cream-dark">
            <SectionEyebrow>Mission</SectionEyebrow>
            <h3 className="font-display text-3xl text-forest mt-2">{about.missionTitle}</h3>
            <p className="mt-4 text-muted leading-relaxed">{about.mission}</p>
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
                alt={`${school.principal.title} ${school.principal.name}`}
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
                alt={`${school.chairman.title} ${school.chairman.name}`}
                className="h-full w-full object-cover object-[center_18%]"
              />
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold-light mt-4">{school.chairman.title}’s message</p>
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
