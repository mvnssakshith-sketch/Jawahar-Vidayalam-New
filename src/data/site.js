import {
  academicCalendar,
  accreditations,
  achievements,
  admissionDates,
  admissionFaqs,
  admissionSteps,
  coreValues,
  eligibility,
  examSystem,
  facilities,
  facultyHighlights,
  feeStructure,
  images,
  programs,
  requiredDocuments,
  school,
  schoolTimings,
  subjectsByStage,
  testimonials,
  whyChoose,
} from './school.js'

// Editable website content, stored in Firestore at meta/site.
// These values are the initial content and the fallback while Firestore loads.
export const DEFAULT_SITE = {
  school,
  images,
  whyChoose,
  programs,
  facilities,
  coreValues,
  achievements,
  accreditations,
  facultyHighlights,
  testimonials,
  academicCalendar,
  schoolTimings,
  subjectsByStage,
  examSystem,
  admissionSteps,
  eligibility,
  requiredDocuments,
  feeStructure,
  admissionDates,
  admissionFaqs,
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

// Fills keys missing from Firestore with defaults; arrays are taken as-is.
export function withSiteDefaults(value, defaults = DEFAULT_SITE) {
  if (!isPlainObject(value)) return defaults
  const out = { ...defaults }
  for (const [k, v] of Object.entries(value)) {
    out[k] = isPlainObject(v) && isPlainObject(defaults[k]) ? withSiteDefaults(v, defaults[k]) : v
  }
  return out
}
