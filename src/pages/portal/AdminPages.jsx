import { useMemo, useState } from 'react'
import { useSchool } from '../../context/SchoolContext'
import { attendanceSummary, examTotals, inr } from '../../lib/utils'
import ResourceManager from './ResourceManager'

function Stat({ label, value }) {
  return (
    <div className="bg-white border border-cream-dark p-5">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="font-display text-4xl text-forest mt-1">{value}</p>
    </div>
  )
}

export function AdminDashboard() {
  const { db } = useSchool()
  const pendingFees = db.fees.filter((f) => f.status === 'Pending').length
  const newAdmissions = db.admissions.length
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Admin dashboard</h1>
      <p className="text-muted mt-1">Central management for Jawahar Vidyalayam.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Stat label="Students" value={db.students.length} />
        <Stat label="Teachers" value={db.teachers.length} />
        <Stat label="New admissions" value={newAdmissions} />
        <Stat label="Pending fee heads" value={pendingFees} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-5 border border-cream-dark">
          <h2 className="font-semibold text-forest">Recent applications</h2>
          <ul className="mt-3 text-sm space-y-2">
            {db.admissions.slice(0, 5).map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>{a.studentName}</span>
                <span className="text-muted">{a.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-5 border border-cream-dark">
          <h2 className="font-semibold text-forest">Latest notices</h2>
          <ul className="mt-3 text-sm space-y-2">
            {db.notices.slice(0, 5).map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function AdminStudents() {
  return (
    <ResourceManager
      title="Students"
      collection="students"
      idPrefix="s"
      columns={[
        { key: 'admissionNo', label: 'Adm. no.' },
        { key: 'name', label: 'Name' },
        { key: 'className', label: 'Class' },
        { key: 'rollNo', label: 'Roll' },
        { key: 'house', label: 'House' },
      ]}
      fields={[
        { key: 'admissionNo', label: 'Admission no.' },
        { key: 'name', label: 'Name' },
        { key: 'dob', label: 'DOB', type: 'date' },
        { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { key: 'className', label: 'Class' },
        { key: 'rollNo', label: 'Roll no.' },
        { key: 'parentId', label: 'Parent ID' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' },
        { key: 'house', label: 'House' },
        { key: 'busRoute', label: 'Bus route' },
      ]}
    />
  )
}

export function AdminParents() {
  return (
    <ResourceManager
      title="Parents"
      collection="parents"
      idPrefix="p"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'children', label: 'Children IDs' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' },
        { key: 'children', label: 'Children IDs (comma later)' },
      ]}
    />
  )
}

export function AdminTeachers() {
  return (
    <ResourceManager
      title="Teachers"
      collection="teachers"
      idPrefix="t"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'subject', label: 'Subject' },
        { key: 'classes', label: 'Classes' },
        { key: 'phone', label: 'Phone' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'subject', label: 'Subject' },
        { key: 'qualification', label: 'Qualification' },
        { key: 'experience', label: 'Experience' },
      ]}
    />
  )
}

export function AdminClasses() {
  return (
    <ResourceManager
      title="Classes"
      collection="classes"
      idPrefix="c"
      columns={[
        { key: 'name', label: 'Class' },
        { key: 'section', label: 'Section' },
        { key: 'teacherId', label: 'Class teacher' },
        { key: 'strength', label: 'Strength' },
      ]}
      fields={[
        { key: 'name', label: 'Class' },
        { key: 'section', label: 'Section' },
        { key: 'teacherId', label: 'Teacher ID' },
        { key: 'strength', label: 'Strength' },
      ]}
    />
  )
}

export function AdminSubjects() {
  return (
    <ResourceManager
      title="Subjects"
      collection="subjects"
      idPrefix="sub"
      columns={[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
        { key: 'stages', label: 'Stages' },
      ]}
      fields={[
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name' },
      ]}
    />
  )
}

export function AdminAttendance() {
  const { db } = useSchool()
  const byStudent = useMemo(
    () =>
      db.students.map((s) => {
        const rec = db.attendance.filter((a) => a.studentId === s.id)
        return { ...s, ...attendanceSummary(rec) }
      }),
    [db],
  )
  const [filter, setFilter] = useState('')
  const rows = filter ? byStudent.filter((s) => s.className === filter) : byStudent
  const classes = Array.from(new Set(db.students.map((s) => s.className)))

  function exportCsv() {
    const header = 'Student,Class,Present,Absent,Percentage'
    const body = rows.map((r) => `${r.name},${r.className},${r.present},${r.absent},${r.pct}%`).join('\n')
    const blob = new Blob([header + '\n' + body], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-report.csv'
    a.click()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-3xl text-forest">Attendance</h1>
        <div className="flex gap-2">
          <select className="border px-3 py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All classes</option>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button onClick={exportCsv} className="bg-forest text-white px-4 py-2 text-sm">
            Export report
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white border">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Class</th>
              <th className="text-right p-3">Present</th>
              <th className="text-right p-3">Absent</th>
              <th className="text-right p-3">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.className}</td>
                <td className="p-3 text-right">{r.present}</td>
                <td className="p-3 text-right">{r.absent}</td>
                <td className="p-3 text-right font-semibold">{r.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminExams() {
  return (
    <ResourceManager
      title="Examinations"
      collection="exams"
      idPrefix="e"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'term', label: 'Term' },
        { key: 'startDate', label: 'Start' },
        { key: 'endDate', label: 'End' },
        { key: 'classes', label: 'Classes' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'term', label: 'Term' },
        { key: 'startDate', label: 'Start', type: 'date' },
        { key: 'endDate', label: 'End', type: 'date' },
      ]}
    />
  )
}

export function AdminResults() {
  const { db } = useSchool()
  const grouped = db.students.map((s) => {
    const marks = db.marks.filter((m) => m.studentId === s.id)
    return { student: s, marks, totals: examTotals(marks) }
  }).filter((g) => g.marks.length)

  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-6">Results</h1>
      <div className="space-y-4">
        {grouped.map((g) => (
          <article key={g.student.id} className="bg-white border p-5">
            <div className="flex justify-between">
              <h2 className="font-semibold text-forest">{g.student.name} · {g.student.className}</h2>
              <p>
                {g.totals.percent.toFixed(1)}% · Grade {g.totals.grade}
              </p>
            </div>
            <table className="w-full text-sm mt-3">
              <tbody>
                {g.marks.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="py-2">{m.subject}</td>
                    <td className="py-2 text-right">{m.scored} / {m.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        ))}
      </div>
    </div>
  )
}

export function AdminFees() {
  const { db, update } = useSchool()
  return (
    <div>
      <ResourceManager
        title="Fee heads"
        collection="fees"
        idPrefix="f"
        columns={[
          { key: 'studentId', label: 'Student' },
          { key: 'head', label: 'Head' },
          { key: 'amount', label: 'Amount' },
          { key: 'dueDate', label: 'Due' },
          { key: 'status', label: 'Status' },
        ]}
        fields={[
          { key: 'studentId', label: 'Student ID' },
          { key: 'head', label: 'Head' },
          { key: 'amount', label: 'Amount' },
          { key: 'dueDate', label: 'Due date', type: 'date' },
          { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Paid'] },
        ]}
      />
      <h2 className="font-display text-2xl text-forest mt-10 mb-3">Transactions</h2>
      <div className="bg-white border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="p-3 text-left">Receipt</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {db.payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.receiptNo}</td>
                <td className="p-3">{p.date}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3 text-right">{inr(p.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 text-sm text-forest font-semibold"
        onClick={() =>
          update((d) => {
            d.payments.push({
              id: `pay-${Date.now()}`,
              studentId: 's1',
              amount: 0,
              date: new Date().toISOString().slice(0, 10),
              method: 'Office',
              receiptNo: `JV-RCPT-${Math.floor(10000 + Math.random() * 90000)}`,
              status: 'Success',
            })
            return d
          })
        }
      >
        Record office receipt
      </button>
    </div>
  )
}

export function AdminAdmissions() {
  const { db, update } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-6">Admissions</h1>
      <div className="overflow-x-auto bg-white border">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {db.admissions.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.studentName}</td>
                <td className="p-3">{a.classApplying}</td>
                <td className="p-3">{a.status}</td>
                <td className="p-3">
                  <select
                    className="border px-2 py-1"
                    value={a.status}
                    onChange={(e) =>
                      update((d) => {
                        const row = d.admissions.find((x) => x.id === a.id)
                        if (row) row.status = e.target.value
                        return d
                      })
                    }
                  >
                    {['Submitted', 'Under Review', 'Assessment Scheduled', 'Admitted', 'Waitlisted', 'Not selected'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminNotices() {
  return (
    <ResourceManager
      title="Notices"
      collection="notices"
      idPrefix="n"
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'title', label: 'Title' },
        { key: 'audience', label: 'Audience' },
        { key: 'category', label: 'Category' },
      ]}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'audience', label: 'Audience', type: 'select', options: ['Public', 'All', 'Students', 'Parents', 'Teachers'] },
        { key: 'category', label: 'Category', type: 'select', options: ['Admission', 'Exam', 'Holiday', 'PTM', 'Event', 'Emergency'] },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]}
    />
  )
}

export function AdminEvents() {
  return (
    <ResourceManager
      title="Events"
      collection="events"
      idPrefix="ev"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' },
        { key: 'location', label: 'Location' },
        { key: 'category', label: 'Category' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'time', label: 'Time' },
        { key: 'location', label: 'Location' },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'image', label: 'Image URL' },
      ]}
    />
  )
}

export function AdminHomework() {
  return (
    <ResourceManager
      title="Homework"
      collection="homework"
      idPrefix="hw"
      columns={[
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'title', label: 'Title' },
        { key: 'dueDate', label: 'Due' },
      ]}
      fields={[
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'title', label: 'Title' },
        { key: 'dueDate', label: 'Due', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'teacherId', label: 'Teacher ID' },
      ]}
    />
  )
}

export function AdminAssignments() {
  return (
    <ResourceManager
      title="Assignments"
      collection="assignments"
      idPrefix="as"
      columns={[
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'title', label: 'Title' },
        { key: 'dueDate', label: 'Due' },
      ]}
      fields={[
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'title', label: 'Title' },
        { key: 'dueDate', label: 'Due', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'teacherId', label: 'Teacher ID' },
      ]}
    />
  )
}

export function AdminGallery() {
  return (
    <ResourceManager
      title="Gallery"
      collection="gallery"
      idPrefix="g"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'type', label: 'Type' },
        { key: 'src', label: 'URL' },
      ]}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', type: 'select', options: ['Campus', 'Sports', 'Cultural', 'STEM', 'Student Life'] },
        { key: 'type', label: 'Type', type: 'select', options: ['photo', 'video'] },
        { key: 'src', label: 'Image / video URL' },
      ]}
    />
  )
}

export function AdminDocuments() {
  return (
    <ResourceManager
      title="Documents & study materials"
      collection="studyMaterials"
      idPrefix="sm"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'type', label: 'Type' },
      ]}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'className', label: 'Class' },
        { key: 'subject', label: 'Subject' },
        { key: 'type', label: 'Type' },
        { key: 'uploadedBy', label: 'Uploaded by' },
      ]}
    />
  )
}

export function AdminTransport() {
  return (
    <ResourceManager
      title="Transport routes"
      collection="busRoutes"
      idPrefix="R"
      columns={[
        { key: 'id', label: 'Route' },
        { key: 'name', label: 'Name' },
        { key: 'busNo', label: 'Bus' },
        { key: 'driver', label: 'Driver' },
        { key: 'timing', label: 'Timing' },
      ]}
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'busNo', label: 'Bus no.' },
        { key: 'driver', label: 'Driver' },
        { key: 'driverPhone', label: 'Driver phone' },
        { key: 'timing', label: 'Timing' },
      ]}
    />
  )
}

export function AdminReports() {
  const { db } = useSchool()
  const pending = db.fees.filter((f) => f.status === 'Pending').reduce((s, f) => s + Number(f.amount), 0)
  const collected = db.payments.reduce((s, p) => s + Number(p.amount), 0)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Reports</h1>
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Stat label="Fee collected" value={inr(collected)} />
        <Stat label="Pending dues" value={inr(pending)} />
        <Stat label="Leave requests" value={db.leaveRequests.length} />
      </div>
      <p className="mt-6 text-sm text-muted">
        Attendance exports are available on the Attendance page. Report cards can be printed from the student results view.
      </p>
    </div>
  )
}

export function AdminSettings() {
  const { db, update, reset } = useSchool()
  const [form, setForm] = useStateLocal(db.settings)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Website settings</h1>
      <form
        className="mt-6 bg-white p-6 border max-w-lg grid gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          update((d) => {
            d.settings = form
            return d
          })
        }}
      >
        <label className="text-sm">
          School name
          <input className="mt-1 w-full border px-3 py-2" value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} />
        </label>
        <label className="text-sm">
          Academic year
          <input className="mt-1 w-full border px-3 py-2" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} />
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={form.admissionsOpen} onChange={(e) => setForm({ ...form, admissionsOpen: e.target.checked })} />
          Admissions open
        </label>
        <button className="bg-forest text-white py-2 font-semibold">Save settings</button>
      </form>
      <button
        className="mt-8 text-sm text-red-800"
        onClick={() => {
          if (window.confirm('Reset all demo data?')) reset()
        }}
      >
        Reset demo database
      </button>
    </div>
  )
}

function useStateLocal(initial) {
  const [form, setForm] = useState(initial)
  return [form, setForm]
}
