import { useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import { attendanceSummary, examTotals } from '../../lib/utils'
import { uid } from '../../data/store'

function teacherOf(user, db) {
  return db.teachers.find((t) => t.id === user.teacherId) || db.teachers[0]
}

export function TeacherDashboard() {
  const { user } = useAuth()
  const { db } = useSchool()
  const teacher = teacherOf(user, db)
  const classStudents = db.students.filter((s) => teacher.classes?.includes(s.className) || s.className === '8-A')
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Good day, {teacher.name}</h1>
      <p className="text-muted mt-1">{teacher.subject} · Classes { (teacher.classes || ['8-A']).join(', ') }</p>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Students</p><p className="font-display text-4xl text-forest">{classStudents.length}</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Homework</p><p className="font-display text-4xl text-forest">{db.homework.filter((h) => h.teacherId === teacher.id).length}</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Pending leave</p><p className="font-display text-4xl text-forest">{db.leaveRequests.filter((l) => l.status === 'Pending').length}</p></div>
      </div>
    </div>
  )
}

export function TeacherProfile() {
  const { user } = useAuth()
  const { db } = useSchool()
  const t = teacherOf(user, db)
  return (
    <div className="bg-white p-6 border max-w-xl">
      <h1 className="font-display text-3xl text-forest">{t.name}</h1>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-muted">Subject</dt><dd>{t.subject}</dd></div>
        <div><dt className="text-muted">Qualification</dt><dd>{t.qualification}</dd></div>
        <div><dt className="text-muted">Experience</dt><dd>{t.experience}</dd></div>
        <div><dt className="text-muted">Email</dt><dd>{t.email}</dd></div>
        <div className="col-span-2"><dt className="text-muted">Class allocation</dt><dd>{(t.classes || []).join(', ')}</dd></div>
      </dl>
    </div>
  )
}

export function TeacherAttendance() {
  const { user } = useAuth()
  const { db, update } = useSchool()
  const teacher = teacherOf(user, db)
  const className = (teacher.classes && teacher.classes[0]) || '8-A'
  const students = db.students.filter((s) => s.className === className)
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(today)

  function mark(studentId, status) {
    update((d) => {
      const existing = d.attendance.find((a) => a.studentId === studentId && a.date === date)
      if (existing) existing.status = status
      else d.attendance.push({ id: uid('att'), studentId, className, date, status, markedBy: teacher.id })
      return d
    })
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Mark attendance · {className}</h1>
      <label className="block mt-4 text-sm">
        Date
        <input type="date" className="ml-2 border px-2 py-1" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <div className="mt-6 bg-white border">
        {students.map((s) => {
          const rec = db.attendance.find((a) => a.studentId === s.id && a.date === date)
          return (
            <div key={s.id} className="flex items-center justify-between p-3 border-b">
              <span>{s.rollNo}. {s.name}</span>
              <div className="flex gap-2">
                <button onClick={() => mark(s.id, 'Present')} className={`px-3 py-1 text-sm ${rec?.status === 'Present' ? 'bg-forest text-white' : 'border'}`}>Present</button>
                <button onClick={() => mark(s.id, 'Absent')} className={`px-3 py-1 text-sm ${rec?.status === 'Absent' ? 'bg-red-800 text-white' : 'border'}`}>Absent</button>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted mt-3">Parents can be notified automatically when a child is marked absent (SMS / WhatsApp integration in Phase 3).</p>
    </div>
  )
}

export function TeacherMarks() {
  const { db, update } = useSchool()
  const [examId, setExamId] = useState(db.exams[0]?.id || '')
  const [studentId, setStudentId] = useState(db.students[0]?.id || '')
  const [subject, setSubject] = useState('English')
  const [scored, setScored] = useState('30')
  const [max, setMax] = useState('40')

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Enter marks</h1>
      <form
        className="mt-6 bg-white p-5 border grid sm:grid-cols-2 gap-3 max-w-2xl"
        onSubmit={(e) => {
          e.preventDefault()
          update((d) => {
            d.marks.push({ id: uid('m'), examId, studentId, subject, max: Number(max), scored: Number(scored) })
            return d
          })
        }}
      >
        <select className="border px-3 py-2" value={examId} onChange={(e) => setExamId(e.target.value)}>
          {db.exams.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <select className="border px-3 py-2" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          {db.students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.className})</option>)}
        </select>
        <input className="border px-3 py-2" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
        <div className="flex gap-2">
          <input className="border px-3 py-2 w-full" value={scored} onChange={(e) => setScored(e.target.value)} placeholder="Scored" />
          <input className="border px-3 py-2 w-full" value={max} onChange={(e) => setMax(e.target.value)} placeholder="Max" />
        </div>
        <button className="bg-forest text-white py-2 font-semibold sm:col-span-2">Save marks</button>
      </form>
    </div>
  )
}

export function TeacherHomework() {
  const { user } = useAuth()
  const { db, update } = useSchool()
  const teacher = teacherOf(user, db)
  const [form, setForm] = useState({ className: '8-A', subject: teacher.subject, title: '', dueDate: '', description: '' })
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Homework</h1>
      <form
        className="mt-4 bg-white p-5 border grid gap-3 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault()
          update((d) => {
            d.homework.unshift({ id: uid('hw'), ...form, teacherId: teacher.id })
            return d
          })
          setForm({ ...form, title: '', description: '' })
        }}
      >
        <input className="border px-3 py-2" placeholder="Class" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} />
        <input className="border px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input type="date" className="border px-3 py-2" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
        <textarea className="border px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="bg-forest text-white py-2">Upload homework</button>
      </form>
      <ul className="mt-6 space-y-2">
        {db.homework.filter((h) => h.teacherId === teacher.id || h.className === '8-A').map((h) => (
          <li key={h.id} className="bg-white p-4 border">{h.className} · {h.title} · due {h.dueDate}</li>
        ))}
      </ul>
    </div>
  )
}

export function TeacherAssignments() {
  const { user } = useAuth()
  const { db, update } = useSchool()
  const teacher = teacherOf(user, db)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Assignments</h1>
      <button
        className="mt-4 bg-forest text-white px-4 py-2 text-sm"
        onClick={() =>
          update((d) => {
            d.assignments.unshift({
              id: uid('as'),
              className: '8-A',
              subject: teacher.subject,
              title: 'New assignment',
              dueDate: new Date().toISOString().slice(0, 10),
              teacherId: teacher.id,
              description: 'Uploaded from teacher portal',
            })
            return d
          })
        }
      >
        Upload assignment
      </button>
      <ul className="mt-6 space-y-2">
        {db.assignments.map((a) => (
          <li key={a.id} className="bg-white p-4 border">{a.title} · {a.className} · {a.dueDate}</li>
        ))}
      </ul>
    </div>
  )
}

export function TeacherMaterials() {
  const { user } = useAuth()
  const { db, update } = useSchool()
  const teacher = teacherOf(user, db)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Study materials</h1>
      <button
        className="mt-4 bg-forest text-white px-4 py-2 text-sm"
        onClick={() => {
          const title = window.prompt('Material title')
          if (!title) return
          update((d) => {
            d.studyMaterials.unshift({ id: uid('sm'), className: '8-A', subject: teacher.subject, title, type: 'PDF', uploadedBy: teacher.id })
            return d
          })
        }}
      >
        Upload material
      </button>
      <ul className="mt-6 space-y-2">
        {db.studyMaterials.map((m) => (
          <li key={m.id} className="bg-white p-4 border">{m.title} · {m.className} · {m.type}</li>
        ))}
      </ul>
    </div>
  )
}

export function TeacherNotices() {
  const { db, update } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Create announcement</h1>
      <form
        className="mt-4 bg-white p-5 border grid gap-3 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.target)
          update((d) => {
            d.notices.unshift({
              id: uid('n'),
              title: data.get('title'),
              body: data.get('body'),
              audience: 'Students',
              category: 'Event',
              date: new Date().toISOString().slice(0, 10),
            })
            return d
          })
          e.target.reset()
        }}
      >
        <input name="title" required className="border px-3 py-2" placeholder="Title" />
        <textarea name="body" required className="border px-3 py-2" placeholder="Message" />
        <button className="bg-forest text-white py-2">Publish</button>
      </form>
      <ul className="mt-6 space-y-2">
        {db.notices.slice(0, 8).map((n) => (
          <li key={n.id} className="bg-white p-4 border">{n.title}</li>
        ))}
      </ul>
    </div>
  )
}

export function TeacherStudents() {
  const { db } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Student information</h1>
      <div className="overflow-x-auto bg-white border">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Parent phone</th>
            </tr>
          </thead>
          <tbody>
            {db.students.map((s) => {
              const p = db.parents.find((x) => x.id === s.parentId)
              return (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.className}</td>
                  <td className="p-3">{s.rollNo}</td>
                  <td className="p-3">{p?.phone}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function TeacherLeave() {
  const { db, update } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Leave management</h1>
      {db.leaveRequests.map((l) => {
        const s = db.students.find((x) => x.id === l.studentId)
        return (
          <div key={l.id} className="bg-white border p-4 mb-3 flex justify-between gap-3">
            <div>
              <p className="font-semibold">{s?.name} · {l.reason}</p>
              <p className="text-sm text-muted">{l.from} to {l.to} · {l.status}</p>
            </div>
            <div className="flex gap-2">
              {['Approved', 'Rejected'].map((st) => (
                <button
                  key={st}
                  className="border px-3 py-1 text-sm"
                  onClick={() =>
                    update((d) => {
                      const row = d.leaveRequests.find((x) => x.id === l.id)
                      if (row) row.status = st
                      return d
                    })
                  }
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TeacherTimetable() {
  const { db } = useSchool()
  const rows = db.timetable.filter((t) => t.className === '8-A')
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Timetable · 8-A</h1>
      <div className="overflow-x-auto bg-white border">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              <th className="p-3 text-left">Day</th>
              {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                <th key={p} className="p-3">P{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.day} className="border-t">
                <td className="p-3 font-medium">{r.day}</td>
                {r.periods.map((p, i) => (
                  <td key={i} className="p-3 text-center">{p}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function useChildContext() {
  const { user } = useAuth()
  const { db } = useSchool()
  return useMemo(() => {
    if (user.role === 'student') {
      const student = db.students.find((s) => s.id === user.studentId) || db.students[0]
      const parent = db.parents.find((p) => p.id === student.parentId)
      return { student, parent }
    }
    const parent = db.parents.find((p) => p.id === user.parentId) || db.parents[0]
    const student = db.students.find((s) => s.id === parent.children?.[0]) || db.students[0]
    return { student, parent }
  }, [db, user])
}

export function ParentDashboard() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const att = attendanceSummary(db.attendance.filter((a) => a.studentId === student.id))
  const pending = db.fees.filter((f) => f.studentId === student.id && f.status === 'Pending')
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Hello, parent of {student.name}</h1>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Attendance</p><p className="font-display text-4xl text-forest">{att.pct}%</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Pending fees</p><p className="font-display text-4xl text-forest">{pending.length}</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Class</p><p className="font-display text-4xl text-forest">{student.className}</p></div>
      </div>
    </div>
  )
}

export function ChildProfile() {
  const { student, parent } = useChildContext()
  return (
    <div className="bg-white p-6 border max-w-xl">
      <h1 className="font-display text-3xl text-forest">{student.name}</h1>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-muted">Admission no.</dt><dd>{student.admissionNo}</dd></div>
        <div><dt className="text-muted">Class</dt><dd>{student.className}</dd></div>
        <div><dt className="text-muted">Roll</dt><dd>{student.rollNo}</dd></div>
        <div><dt className="text-muted">House</dt><dd>{student.house}</dd></div>
        <div><dt className="text-muted">Bus</dt><dd>{student.busRoute || 'Self'}</dd></div>
        <div><dt className="text-muted">Parent</dt><dd>{parent?.name}</dd></div>
      </dl>
    </div>
  )
}

export function FamilyAttendance() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const rec = db.attendance.filter((a) => a.studentId === student.id)
  const sum = attendanceSummary(rec)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Attendance · {student.name}</h1>
      <p className="mt-2">Present {sum.present} · Absent {sum.absent} · {sum.pct}%</p>
      <div className="mt-4 bg-white border max-h-[480px] overflow-auto">
        {rec.map((r) => (
          <div key={r.id} className="flex justify-between p-3 border-b text-sm">
            <span>{r.date}</span>
            <span className={r.status === 'Absent' ? 'text-red-700' : 'text-forest'}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FamilyResults() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const marks = db.marks.filter((m) => m.studentId === student.id)
  const totals = examTotals(marks)
  return (
    <div>
      <div className="flex justify-between items-start no-print">
        <h1 className="font-display text-3xl text-forest">Results · {student.name}</h1>
        <button onClick={() => window.print()} className="bg-forest text-white px-4 py-2 text-sm">Download / print report card</button>
      </div>
      <article className="bg-white border p-8 mt-6 max-w-2xl" id="report-card">
        <p className="text-center text-xs tracking-widest uppercase text-gold-dark">Jawahar Vidyalayam · Report card</p>
        <h2 className="text-center font-display text-3xl text-forest mt-1">{student.name}</h2>
        <p className="text-center text-sm text-muted">{student.className} · {student.admissionNo}</p>
        <table className="w-full text-sm mt-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Subject</th>
              <th className="text-right py-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="py-2">{m.subject}</td>
                <td className="py-2 text-right">{m.scored} / {m.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 font-semibold">Percentage {totals.percent.toFixed(1)}% · Grade {totals.grade}</p>
      </article>
    </div>
  )
}

export function FamilyFees() {
  const { student, parent } = useChildContext()
  const { db, update } = useSchool()
  const { user } = useAuth()
  const items = db.fees.filter((f) => f.studentId === student.id)
  const history = db.payments.filter((p) => p.studentId === student.id)
  const canPay = user.role === 'parent'

  function pay(fee) {
    if (!window.confirm(`Pay ${fee.head} of ₹${fee.amount} via demo gateway?`)) return
    const receiptNo = `JV-RCPT-${Math.floor(10000 + Math.random() * 90000)}`
    update((d) => {
      const row = d.fees.find((x) => x.id === fee.id)
      if (row) row.status = 'Paid'
      d.payments.unshift({
        id: uid('pay'),
        studentId: student.id,
        feeId: fee.id,
        amount: Number(fee.amount),
        date: new Date().toISOString().slice(0, 10),
        method: 'UPI',
        receiptNo,
        status: 'Success',
      })
      return d
    })
    window.alert(`Payment successful. Receipt ${receiptNo} generated. Email/SMS/WhatsApp notification would be sent to ${parent?.email || 'the registered parent'}.`)
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Fees · {student.name}</h1>
      <div className="mt-6 space-y-3">
        {items.map((f) => (
          <div key={f.id} className="bg-white border p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{f.head}</p>
              <p className="text-sm text-muted">Due {f.dueDate} · ₹{f.amount} · {f.status}</p>
            </div>
            {canPay && f.status === 'Pending' ? (
              <button onClick={() => pay(f)} className="bg-gold text-forest-deep px-4 py-2 text-sm font-semibold">Pay online</button>
            ) : null}
          </div>
        ))}
      </div>
      <h2 className="font-display text-2xl text-forest mt-10">Transaction history</h2>
      <ul className="mt-3 bg-white border">
        {history.map((p) => (
          <li key={p.id} className="p-3 border-b text-sm flex justify-between">
            <span>{p.receiptNo} · {p.date} · {p.method}</span>
            <button
              className="text-forest font-semibold"
              onClick={() => window.print()}
            >
              Receipt
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FamilyNotices() {
  const { db } = useSchool()
  const { user } = useAuth()
  const list = db.notices.filter((n) => n.audience === 'All' || n.audience === 'Public' || (user.role === 'parent' ? n.audience === 'Parents' : n.audience === 'Students'))
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Notices</h1>
      {list.map((n) => (
        <article key={n.id} className="bg-white border p-4 mb-3">
          <p className="text-xs text-gold-dark">{n.date} · {n.category}</p>
          <h2 className="font-semibold text-forest">{n.title}</h2>
          <p className="text-sm text-muted mt-1">{n.body}</p>
        </article>
      ))}
    </div>
  )
}

export function FamilyHomework() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const list = db.homework.filter((h) => h.className === student.className)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Homework</h1>
      {list.map((h) => (
        <article key={h.id} className="bg-white border p-4 mb-3">
          <p className="text-xs text-gold-dark">{h.subject} · due {h.dueDate}</p>
          <h2 className="font-semibold">{h.title}</h2>
          <p className="text-sm text-muted mt-1">{h.description}</p>
        </article>
      ))}
    </div>
  )
}

export function ParentMessages() {
  const { parent, student } = useChildContext()
  const { db, update } = useSchool()
  const thread = db.messages.filter((m) => m.studentId === student.id)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Teacher communication</h1>
      <div className="mt-4 space-y-3">
        {thread.map((m) => (
          <article key={m.id} className="bg-white border p-4">
            <p className="text-xs text-muted">{m.date} · {m.fromRole}</p>
            <h2 className="font-semibold">{m.subject}</h2>
            <p className="text-sm mt-1">{m.body}</p>
          </article>
        ))}
      </div>
      <form
        className="mt-6 bg-white p-4 border grid gap-3 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.target)
          update((d) => {
            d.messages.push({
              id: uid('msg'),
              fromRole: 'parent',
              fromId: parent.id,
              toRole: 'teacher',
              toId: 't1',
              subject: data.get('subject'),
              body: data.get('body'),
              date: new Date().toISOString().slice(0, 10),
              studentId: student.id,
            })
            return d
          })
          e.target.reset()
        }}
      >
        <input name="subject" required className="border px-3 py-2" placeholder="Subject" />
        <textarea name="body" required className="border px-3 py-2" placeholder="Message to class teacher" />
        <button className="bg-forest text-white py-2">Send</button>
      </form>
    </div>
  )
}

export function ParentLeave() {
  const { parent, student } = useChildContext()
  const { db, update } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Leave requests</h1>
      <form
        className="mt-4 bg-white p-4 border grid gap-3 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.target)
          update((d) => {
            d.leaveRequests.unshift({
              id: uid('lv'),
              studentId: student.id,
              from: data.get('from'),
              to: data.get('to'),
              reason: data.get('reason'),
              status: 'Pending',
              requestedBy: parent.id,
            })
            return d
          })
          e.target.reset()
        }}
      >
        <input type="date" name="from" required className="border px-3 py-2" />
        <input type="date" name="to" required className="border px-3 py-2" />
        <input name="reason" required className="border px-3 py-2" placeholder="Reason" />
        <button className="bg-forest text-white py-2">Submit leave</button>
      </form>
      <ul className="mt-6">
        {db.leaveRequests.filter((l) => l.studentId === student.id).map((l) => (
          <li key={l.id} className="bg-white border p-3 mb-2">{l.from} – {l.to} · {l.reason} · {l.status}</li>
        ))}
      </ul>
    </div>
  )
}

export function StudentDashboard() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const att = attendanceSummary(db.attendance.filter((a) => a.studentId === student.id))
  const hw = db.homework.filter((h) => h.className === student.className)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Welcome, {student.name}</h1>
      <p className="text-muted">{student.className} · House {student.house}</p>
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Attendance</p><p className="font-display text-4xl text-forest">{att.pct}%</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Open homework</p><p className="font-display text-4xl text-forest">{hw.length}</p></div>
        <div className="bg-white p-5 border"><p className="text-xs uppercase text-muted">Roll no.</p><p className="font-display text-4xl text-forest">{student.rollNo}</p></div>
      </div>
    </div>
  )
}

export function StudentTimetable() {
  return <TeacherTimetable />
}

export function StudentAssignments() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const list = db.assignments.filter((a) => a.className === student.className)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Assignments</h1>
      {list.map((a) => (
        <article key={a.id} className="bg-white border p-4 mb-3">
          <p className="text-xs text-gold-dark">{a.subject} · due {a.dueDate}</p>
          <h2 className="font-semibold">{a.title}</h2>
          <p className="text-sm text-muted">{a.description}</p>
        </article>
      ))}
    </div>
  )
}

export function StudentExams() {
  const { db } = useSchool()
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Exam schedule</h1>
      {db.exams.map((e) => (
        <article key={e.id} className="bg-white border p-4 mb-3">
          <h2 className="font-semibold">{e.name}</h2>
          <p className="text-sm text-muted">{e.startDate} – {e.endDate} · {e.term}</p>
        </article>
      ))}
    </div>
  )
}

export function StudentMaterials() {
  const { student } = useChildContext()
  const { db } = useSchool()
  const list = db.studyMaterials.filter((m) => m.className === student.className)
  return (
    <div>
      <h1 className="font-display text-3xl text-forest mb-4">Study materials</h1>
      {list.map((m) => (
        <article key={m.id} className="bg-white border p-4 mb-3 flex justify-between">
          <div>
            <h2 className="font-semibold">{m.title}</h2>
            <p className="text-sm text-muted">{m.subject} · {m.type}</p>
          </div>
          <a
            className="text-forest text-sm font-semibold"
            href={'data:text/plain;charset=utf-8,' + encodeURIComponent(m.title + '\nJawahar Vidyalayam study material')}
            download={`${m.title}.txt`}
          >
            Download
          </a>
        </article>
      ))}
    </div>
  )
}
