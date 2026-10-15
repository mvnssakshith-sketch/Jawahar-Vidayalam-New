import { useMemo, useState } from 'react'
import Photo from '../components/Photo'
import { PageHero, SectionTitle } from '../components/ui/Blocks'
import { useSchool } from '../context/SchoolContext'
import { images } from '../data/school'

export default function Gallery() {
  const { db } = useSchool()
  const [cat, setCat] = useState('All')
  const categories = useMemo(() => ['All', ...Array.from(new Set(db.gallery.map((g) => g.category)))], [db.gallery])
  const items = cat === 'All' ? db.gallery : db.gallery.filter((g) => g.category === cat)

  return (
    <div>
      <PageHero eyebrow="Moments" title="Photo & activity gallery" subtitle="Campus, sports, cultural life, laboratories, and student work." image={images.graduation} />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-1.5 text-sm border ${cat === c ? 'bg-forest text-white border-forest' : 'border-cream-dark text-forest'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <SectionTitle className="mt-8">Selected frames</SectionTitle>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((g) => (
              <figure key={g.id} className="relative group overflow-hidden">
                <Photo src={g.src} alt={g.title} className="h-52 md:h-64 w-full object-cover group-hover:scale-105 transition" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-forest-deep/80 text-white text-sm px-3 py-2">{g.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
