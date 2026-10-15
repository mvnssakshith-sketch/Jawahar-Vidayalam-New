import { Link } from 'react-router-dom'

export function SectionEyebrow({ children }) {
  return (
    <p className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-dark">{children}</p>
  )
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-3xl md:text-5xl text-navy leading-tight mt-2 ${className}`}>
      {children}
    </h2>
  )
}

export function PageHero({ eyebrow, title, subtitle, image }) {
  return (
    <section
      className="relative isolate overflow-hidden bg-forest-deep text-white"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-light">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-4xl md:text-6xl mt-3 max-w-4xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-white/80 text-lg">{subtitle}</p> : null}
      </div>
      <div className="brand-stripe absolute inset-x-0 bottom-0" />
    </section>
  )
}

export function GoldButton({ children, className = '', href, to, ...props }) {
  const styles = `inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-light transition shadow-sm ${className}`
  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
