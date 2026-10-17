import { PageHero, SectionTitle } from '../components/ui/Blocks'
import { useSite } from '../context/SchoolContext'

export default function FeesPage() {
  const { feeStructure } = useSite()
  return (
    <div>
      <PageHero eyebrow="Admissions" title="Fee structure" subtitle="Indicative annual heads for the current planning year. Transport is optional. Official invoices are issued after enrolment." />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 overflow-x-auto">
          <SectionTitle>Tuition and other heads</SectionTitle>
          <table className="mt-8 w-full text-sm min-w-[640px]">
            <thead className="bg-forest text-white">
              <tr>
                <th className="text-left p-3 font-medium">Head</th>
                <th className="p-3">Nursery–UKG</th>
                <th className="p-3">Primary</th>
                <th className="p-3">Middle</th>
                <th className="p-3">High</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((row) => (
                <tr key={row.head} className="border-b border-cream-dark">
                  <td className="p-3 font-medium text-forest">{row.head}</td>
                  <td className="p-3 text-center">{row.nursery}</td>
                  <td className="p-3 text-center">{row.primary}</td>
                  <td className="p-3 text-center">{row.middle}</td>
                  <td className="p-3 text-center">{row.high}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-muted">Parents can pay pending fees online after login. Receipts are generated automatically on success.</p>
        </div>
      </section>
    </div>
  )
}
