import { PageHero, SectionEyebrow, SectionTitle } from '../components/ui/Blocks'
import Photo from '../components/Photo'
import { facilities, images } from '../data/school'

export default function Facilities() {
  return (
    <div>
      <PageHero
        eyebrow="Infrastructure"
        title="A campus built for learning, play, and safety"
        subtitle="Smart rooms, laboratories, library, sports, transport, medical care, and a robotics lab."
        image={images.campus}
      />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionEyebrow>Facilities</SectionEyebrow>
          <SectionTitle>Every space has a purpose</SectionTitle>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {facilities.map((f) => (
              <article key={f.name} className="grid sm:grid-cols-2 gap-4 items-center border border-cream-dark p-3">
                <Photo src={f.image} alt={f.name} className="h-44 w-full object-cover" />
                <div className="p-2">
                  <h3 className="font-display text-2xl text-forest">{f.name}</h3>
                  <p className="text-sm text-muted mt-2">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
