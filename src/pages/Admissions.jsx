import { Link } from 'react-router-dom'
import { GoldButton, PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import {
  admissionDates,
  admissionFaqs,
  admissionSteps,
  eligibility,
  images,
  requiredDocuments,
  school,
} from '../data/school'

export default function Admissions() {
  return (
    <div>
      <PageHero
        eyebrow="Admissions"
        title={`Join Jawahar Vidyalayam for ${school.academicYear}`}
        subtitle="A transparent process: enquire, apply, interact, enrol. Every application receives an Application ID."
        image={images.kids}
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Procedure</SectionEyebrow>
          <SectionTitle>Five clear steps</SectionTitle>
          <div className="mt-10 grid md:grid-cols-5 gap-4">
            {admissionSteps.map((s) => (
              <article key={s.step} className="border border-cream-dark p-5">
                <p className="font-display text-3xl text-gold">{s.step}</p>
                <h3 className="font-semibold text-forest mt-2">{s.title}</h3>
                <p className="text-sm text-muted mt-2">{s.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <GoldButton to="/admissions/apply">Start online application</GoldButton>
            <Link to="/admissions/track" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold border border-forest text-forest">
              Track application
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionEyebrow>Eligibility</SectionEyebrow>
            <SectionTitle>Age criteria</SectionTitle>
            <table className="mt-6 w-full text-sm bg-white">
              <tbody>
                {eligibility.map((e) => (
                  <tr key={e.grade} className="border-b border-cream-dark">
                    <td className="p-3 font-medium text-forest">{e.grade}</td>
                    <td className="p-3 text-muted">{e.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <SectionEyebrow>Documents</SectionEyebrow>
            <SectionTitle>What to keep ready</SectionTitle>
            <ul className="mt-6 space-y-2 text-muted">
              {requiredDocuments.map((d) => (
                <li key={d} className="bg-white p-3">• {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Calendar</SectionEyebrow>
          <SectionTitle>Important dates</SectionTitle>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {admissionDates.map((d) => (
              <article key={d.label} className="border border-cream-dark p-5">
                <p className="text-xs uppercase tracking-widest text-gold-dark">{d.label}</p>
                <p className="font-display text-2xl text-forest mt-2">{d.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionEyebrow>FAQs</SectionEyebrow>
          <SectionTitle>Common questions</SectionTitle>
          <div className="mt-8 space-y-4">
            {admissionFaqs.map((f) => (
              <details key={f.q} className="bg-white p-5 border border-cream-dark">
                <summary className="font-semibold text-forest cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
