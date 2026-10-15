export function inr(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export function attendanceSummary(records) {
  const present = records.filter((r) => r.status === 'Present').length
  const absent = records.filter((r) => r.status === 'Absent').length
  const total = records.length
  const pct = total ? ((present / total) * 100).toFixed(1) : '0.0'
  return { present, absent, total, pct }
}

export function gradeFrom(percent) {
  if (percent >= 90) return 'A1'
  if (percent >= 80) return 'A2'
  if (percent >= 70) return 'B1'
  if (percent >= 60) return 'B2'
  if (percent >= 50) return 'C1'
  if (percent >= 40) return 'C2'
  if (percent >= 33) return 'D'
  return 'E'
}

export function examTotals(marks) {
  const max = marks.reduce((s, m) => s + Number(m.max), 0)
  const scored = marks.reduce((s, m) => s + Number(m.scored), 0)
  const percent = max ? (scored / max) * 100 : 0
  return { max, scored, percent, grade: gradeFrom(percent) }
}

export function classKey(student) {
  return student.className
}
