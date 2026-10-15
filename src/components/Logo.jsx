export default function Logo({ className = 'h-14 w-14', light = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${
        light ? 'rounded-full bg-white/95 p-0.5 shadow-sm' : 'rounded-sm'
      }`}
    >
      <img
        src="/logo.jpg"
        alt="Jawahar Vidyalayam crest — Aswaraopet, 1986"
        className={`${className} object-contain`}
        draggable={false}
      />
    </span>
  )
}
