import { useState } from 'react'

const FALLBACK = '/images/campus.jpg'

export default function Photo({ src, alt, className = '', ...props }) {
  const [current, setCurrent] = useState(src || FALLBACK)
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
      }}
      {...props}
    />
  )
}
