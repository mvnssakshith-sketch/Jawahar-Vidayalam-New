import { Download } from 'lucide-react'
import { useMemo, useState } from 'react'
import { GoldButton, PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import { useSite } from '../context/SchoolContext'
import {
  scertUrl,
  stateBoardUrl,
  stateSyllabus,
  syllabusGroups,
  syllabusIntro,
} from '../data/syllabus'

function downloadClassSyllabus(row) {
  const lines = [
    `Jawahar Vidyalayam, Aswaraopet`,
    `State Syllabus — ${row.classLabel}`,
    `Stage: ${row.stage}`,
    `Framework: ${row.board}`,
    '',
    syllabusIntro.note,
    '',
    ...row.subjects.flatMap((s) => [`${s.name}`, ...s.units.map((u) => `  • ${u}`), '']),
    `BSE Telangana: ${stateBoardUrl}`,
    `SCERT Telangana: ${scertUrl}`,
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Jawahar-Vidyalayam-State-Syllabus-${row.classLabel.replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Syllabus() {
  const { images } = useSite()
  const [group, setGroup] = useState('all')
  const [openId, setOpenId] = useState('10')

  const rows = useMemo(() => {
    if (group === 'all') return stateSyllabus
    const g = syllabusGroups.find((x) => x.id === group)
    return g ? stateSyllabus.filter(g.match) : stateSyllabus
  }, [group])

  return (
    <div>
      <PageHero
        eyebrow="State syllabus"
        title="Class-wise Telangana State syllabus"
        subtitle="Nursery to Class X — subjects and units as followed at Jawahar Vidyalayam, Aswaraopet."
        image={images.library}
      />

      <section className="py-12 border-b border-cream-dark">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionEyebrow>Curriculum framework</SectionEyebrow>
            <SectionTitle>We teach the State syllabus</SectionTitle>
            <p className="mt-4 text-muted leading-relaxed">
              {syllabusIntro.board}. {syllabusIntro.books} {syllabusIntro.note}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GoldButton href={stateBoardUrl} target="_blank" rel="noreferrer">
                BSE Telangana
              </GoldButton>
              <a
                href={scertUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold border border-navy text-navy"
              >
                SCERT textbooks
              </a>
            </div>
          </div>
          <aside className="bg-cream p-6 border border-cream-dark">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-dark">Assessment</p>
            <ul className="mt-3 text-sm text-forest space-y-2">
              <li>• Classes I–IX: school examinations as per State / SCERT scheme</li>
              <li>• Class X: BSE Telangana SSC public examination</li>
              <li>• Co-scholastic: art, HPE, work education, discipline</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGroup('all')}
              className={`px-4 py-2 text-sm border ${group === 'all' ? 'bg-forest text-white border-forest' : 'border-cream-dark text-forest'}`}
            >
              All classes
            </button>
            {syllabusGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(g.id)}
                className={`px-4 py-2 text-sm border ${group === g.id ? 'bg-forest text-white border-forest' : 'border-cream-dark text-forest'}`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {rows.map((row) => {
              const open = openId === row.id
              return (
                <article key={row.id} className="border border-cream-dark bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <button type="button" className="text-left flex-1" onClick={() => setOpenId(open ? '' : row.id)}>
                      <p className="text-xs uppercase tracking-widest text-gold-dark">{row.stage} · {row.board}</p>
                      <h2 className="font-display text-2xl text-forest">{row.classLabel}</h2>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadClassSyllabus(row)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-forest border border-forest px-3 py-2"
                    >
                      <Download className="h-4 w-4" /> Download syllabus
                    </button>
                  </div>
                  {open ? (
                    <div className="border-t border-cream-dark grid md:grid-cols-2 gap-4 p-4 bg-cream/40">
                      {row.subjects.map((s) => (
                        <div key={s.name} className="bg-white p-4">
                          <h3 className="font-semibold text-forest">{s.name}</h3>
                          <ul className="mt-2 text-sm text-muted space-y-1">
                            {s.units.map((u) => (
                              <li key={u}>• {u}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
