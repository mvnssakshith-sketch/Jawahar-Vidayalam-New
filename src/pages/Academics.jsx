import { Link, useParams } from 'react-router-dom'
import { GoldButton, PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import { useSite } from '../context/SchoolContext'
import { stateSyllabus } from '../data/syllabus'

const extra = {
  curriculum:
    'Jawahar Vidyalayam follows the Telangana State syllabus with SCERT textbooks for Classes I–X. Pedagogy is play-based in the early years, inquiry-based in the middle years, and board-aligned for SSC preparation.',
  resources:
    'Homework is posted to the student and parent portals. Study materials, worksheets, and reading lists are uploaded by subject teachers.',
}

const stageToSyllabus = {
  'pre-primary': ['nursery', 'lkg', 'ukg'],
  primary: ['1', '2', '3', '4', '5'],
  middle: ['6', '7', '8'],
  high: ['9', '10'],
}

export default function Academics() {
  const { academicCalendar, examSystem, images, programs, schoolTimings, subjectsByStage } = useSite()
  const { program } = useParams()
  const selected = programs.find((p) => p.slug === program)
  const relatedSyllabus = selected
    ? stateSyllabus.filter((row) => (stageToSyllabus[selected.slug] || []).includes(row.id))
    : []

  return (
    <div>
      <PageHero
        eyebrow="Academics"
        title={selected ? selected.name : 'A clear path from first letters to board exams'}
        subtitle={selected ? selected.summary : 'Pre-primary to Class X · Telangana State syllabus · English medium'}
        image={images.classroom}
      />

      {!selected && program !== 'curriculum' ? (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="bg-forest text-white p-6 md:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-gold-light">State syllabus</p>
                <h2 className="font-display text-3xl mt-1">Class-wise subjects and units (Nursery–Class X)</h2>
                <p className="text-white/75 mt-2 text-sm max-w-xl">
                  Full Telangana State syllabus with a download for every class, including Science, Commerce and Humanities streams.
                </p>
              </div>
              <GoldButton to="/academics/syllabus">Open State syllabus</GoldButton>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {programs.map((p) => (
                <Link key={p.slug} to={`/academics/${p.slug}`} className="border border-cream-dark p-7 card-lift bg-white">
                  <p className="text-xs tracking-[0.2em] uppercase text-gold-dark">{p.grades} · {p.ages}</p>
                  <h2 className="font-display text-3xl text-forest mt-2">{p.name}</h2>
                  <p className="mt-3 text-muted">{p.summary}</p>
                  <ul className="mt-4 text-sm text-forest space-y-1">
                    {p.points.map((pt) => (
                      <li key={pt}>• {pt}</li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {selected ? (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <SectionEyebrow>{selected.grades}</SectionEyebrow>
            <SectionTitle>{selected.name}</SectionTitle>
            <p className="mt-4 text-muted text-lg">{selected.summary}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {selected.points.map((pt) => (
                <li key={pt} className="border border-cream-dark p-4 text-forest">{pt}</li>
              ))}
            </ul>
            <div className="mt-10">
              <h3 className="font-display text-2xl text-forest">Subjects</h3>
              <p className="mt-3 text-muted">
                {(subjectsByStage[selected.name] || []).join(' · ')}
              </p>
            </div>
            {relatedSyllabus.length ? (
              <div className="mt-10">
                <h3 className="font-display text-2xl text-forest">State syllabus for this stage</h3>
                <ul className="mt-4 space-y-2">
                  {relatedSyllabus.map((row) => (
                    <li key={row.id} className="border border-cream-dark p-4 flex justify-between gap-3">
                      <span className="font-medium text-forest">{row.classLabel}</span>
                      <Link to="/academics/syllabus" className="text-sm font-semibold text-gold-dark">View full syllabus →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-cream py-16" id="curriculum">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Curriculum & calendar</SectionEyebrow>
          <SectionTitle>How the year is built</SectionTitle>
          <p className="mt-4 max-w-3xl text-muted">{extra.curriculum}</p>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {academicCalendar.map((m) => (
              <article key={m.month} className="bg-white p-5">
                <h3 className="font-display text-2xl text-forest">{m.month}</h3>
                <ul className="mt-2 text-sm text-muted space-y-1">
                  {m.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionEyebrow>Examination system</SectionEyebrow>
            <SectionTitle>Assessment that teaches, not just ranks</SectionTitle>
            <div className="mt-6 space-y-4">
              {examSystem.map((e) => (
                <article key={e.title} className="border-l-2 border-gold pl-4">
                  <h3 className="font-semibold text-forest">{e.title}</h3>
                  <p className="text-sm text-muted mt-1">{e.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionEyebrow>School timings</SectionEyebrow>
            <SectionTitle>A predictable day</SectionTitle>
            <table className="mt-6 w-full text-sm">
              <tbody>
                {schoolTimings.map((t) => (
                  <tr key={t.group} className="border-b border-cream-dark">
                    <td className="py-3 font-medium text-forest">{t.group}</td>
                    <td className="py-3 text-muted text-right">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-sm text-muted">{extra.resources}</p>
            <Link to="/academics/syllabus" className="mt-4 inline-block font-semibold text-forest">
              Open class-wise State syllabus →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
