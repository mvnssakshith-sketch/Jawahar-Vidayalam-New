export const COLLECTIONS = [
  'teachers',
  'parents',
  'students',
  'classes',
  'subjects',
  'attendance',
  'exams',
  'marks',
  'fees',
  'payments',
  'notices',
  'events',
  'homework',
  'assignments',
  'studyMaterials',
  'gallery',
  'busRoutes',
  'leaveRequests',
  'admissions',
  'enquiries',
  'contacts',
  'timetable',
  'messages',
  'eventRegistrations',
]

export const PUBLIC_COLLECTIONS = ['notices', 'events', 'gallery', 'busRoutes']

export const DEFAULT_SETTINGS = {
  schoolName: 'Jawahar Vidyalayam',
  academicYear: '2026–27',
  admissionsOpen: true,
}

export function emptyDb() {
  return {
    ...Object.fromEntries(COLLECTIONS.map((c) => [c, []])),
    settings: { ...DEFAULT_SETTINGS },
  }
}

function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

export const DEMO_ACCOUNTS = [
  { email: 'admin@jawaharvidyalam.edu', password: 'admin123', role: 'admin', label: 'Admin' },
  { email: 'teacher@jawaharvidyalam.edu', password: 'teacher123', role: 'teacher', label: 'Teacher' },
  { email: 'parent@jawaharvidyalam.edu', password: 'parent123', role: 'parent', label: 'Parent' },
  { email: 'student@jawaharvidyalam.edu', password: 'student123', role: 'student', label: 'Student' },
]

export function buildSeed() {
  const teachers = [
    { id: 't1', name: 'Anjali Menon', email: 'teacher@jawaharvidyalam.edu', phone: '9876500001', subject: 'English', classes: ['8-A'], qualification: 'M.A., B.Ed.', experience: '14 years' },
    { id: 't2', name: 'Rajesh Kumar', email: 'rajesh.kumar@jawaharvidyalam.edu', phone: '9876500002', subject: 'Mathematics', classes: ['10-A', '12-A'], qualification: 'M.Sc., B.Ed.', experience: '18 years' },
    { id: 't3', name: 'Fatima Begum', email: 'fatima.begum@jawaharvidyalam.edu', phone: '9876500003', subject: 'Science', classes: ['8-A', '9-A'], qualification: 'M.Sc., B.Ed.', experience: '11 years' },
    { id: 't4', name: 'Thomas George', email: 'thomas.george@jawaharvidyalam.edu', phone: '9876500004', subject: 'Social Science', classes: ['7-B', '8-A'], qualification: 'M.A., B.Ed.', experience: '9 years' },
    { id: 't5', name: 'Lakshmi Rao', email: 'lakshmi.rao@jawaharvidyalam.edu', phone: '9876500005', subject: 'Computer Science', classes: ['11-A', '12-A'], qualification: 'M.C.A., B.Ed.', experience: '8 years' },
  ]

  const parents = [
    { id: 'p1', name: 'Priya Sharma', email: 'parent@jawaharvidyalam.edu', phone: '9876510001', address: '12, Maple Residency, Education Nagar', children: ['s1'] },
    { id: 'p2', name: 'Arvind Nair', email: 'arvind.nair@email.com', phone: '9876510002', address: '44, Lake View Apts', children: ['s2'] },
    { id: 'p3', name: 'Sanjay Reddy', email: 'sanjay.reddy@email.com', phone: '9876510003', address: '8, Green Park', children: ['s3'] },
    { id: 'p4', name: 'Lakshmi Iyer', email: 'lakshmi.iyer@email.com', phone: '9876510004', address: '21, Temple Street', children: ['s4'] },
    { id: 'p5', name: 'Mehul Patel', email: 'mehul.patel@email.com', phone: '9876510005', address: '3, Sunrise Villas', children: ['s5'] },
    { id: 'p6', name: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '9876510006', address: '19, Orchid Towers', children: ['s6'] },
  ]

  const students = [
    { id: 's1', admissionNo: 'JV20240081', name: 'Aarav Sharma', dob: '2013-06-12', gender: 'Male', className: '8-A', parentId: 'p1', email: 'student@jawaharvidyalam.edu', phone: '9876510001', address: parents[0].address, rollNo: 1, house: 'Nehru', busRoute: 'R1' },
    { id: 's2', admissionNo: 'JV20240112', name: 'Diya Nair', dob: '2016-01-20', gender: 'Female', className: '5-B', parentId: 'p2', email: 'diya.nair@jawaharvidyalam.edu', phone: '9876510002', address: parents[1].address, rollNo: 4, house: 'Tagore', busRoute: 'R2' },
    { id: 's3', admissionNo: 'JV20220009', name: 'Kabir Reddy', dob: '2009-09-04', gender: 'Male', className: '11-A', parentId: 'p3', email: 'kabir.reddy@jawaharvidyalam.edu', phone: '9876510003', address: parents[2].address, rollNo: 7, house: 'Raman', busRoute: 'R1' },
    { id: 's4', admissionNo: 'JV20250044', name: 'Meera Iyer', dob: '2018-03-15', gender: 'Female', className: '3-A', parentId: 'p4', email: 'meera.iyer@jawaharvidyalam.edu', phone: '9876510004', address: parents[3].address, rollNo: 2, house: 'Ashoka', busRoute: 'R3' },
    { id: 's5', admissionNo: 'JV20220155', name: 'Rohan Patel', dob: '2011-11-02', gender: 'Male', className: '10-A', parentId: 'p5', email: 'rohan.patel@jawaharvidyalam.edu', phone: '9876510005', address: parents[4].address, rollNo: 11, house: 'Nehru', busRoute: 'R2' },
    { id: 's6', admissionNo: 'JV20210003', name: 'Ananya Gupta', dob: '2008-07-28', gender: 'Female', className: '12-B', parentId: 'p6', email: 'ananya.gupta@jawaharvidyalam.edu', phone: '9876510006', address: parents[5].address, rollNo: 5, house: 'Tagore', busRoute: '' },
    { id: 's7', admissionNo: 'JV20240082', name: 'Anika Bose', dob: '2013-04-09', gender: 'Female', className: '8-A', parentId: 'p2', email: 'anika.bose@jawaharvidyalam.edu', phone: '9876510002', address: parents[1].address, rollNo: 2, house: 'Ashoka', busRoute: 'R2' },
    { id: 's8', admissionNo: 'JV20240083', name: 'Vikram Shah', dob: '2013-12-18', gender: 'Male', className: '8-A', parentId: 'p5', email: 'vikram.shah@jawaharvidyalam.edu', phone: '9876510005', address: parents[4].address, rollNo: 3, house: 'Raman', busRoute: 'R1' },
  ]

  const classes = [
    { id: 'c-n', name: 'Nursery', section: 'A', teacherId: 't1', strength: 22 },
    { id: 'c-3a', name: '3', section: 'A', teacherId: 't4', strength: 28 },
    { id: 'c-5b', name: '5', section: 'B', teacherId: 't3', strength: 30 },
    { id: 'c-8a', name: '8', section: 'A', teacherId: 't1', strength: 32 },
    { id: 'c-10a', name: '10', section: 'A', teacherId: 't2', strength: 34 },
    { id: 'c-11a', name: '11', section: 'A', teacherId: 't5', strength: 29 },
    { id: 'c-12b', name: '12', section: 'B', teacherId: 't2', strength: 27 },
  ]

  const subjects = [
    { id: 'sub1', name: 'English', code: 'ENG', stages: ['Primary', 'Middle', 'High', 'HS'] },
    { id: 'sub2', name: 'Mathematics', code: 'MAT', stages: ['Primary', 'Middle', 'High', 'HS'] },
    { id: 'sub3', name: 'Science', code: 'SCI', stages: ['Middle', 'High'] },
    { id: 'sub4', name: 'Social Science', code: 'SST', stages: ['Middle', 'High'] },
    { id: 'sub5', name: 'Computer Science', code: 'CS', stages: ['High', 'HS'] },
    { id: 'sub6', name: 'Physics', code: 'PHY', stages: ['HS'] },
    { id: 'sub7', name: 'Hindi', code: 'HIN', stages: ['Primary', 'Middle', 'High'] },
  ]

  const attendance = []
  students.forEach((s) => {
    for (let i = 1; i <= 24; i += 1) {
      const date = daysAgo(i)
      const absent = (s.id === 's1' && (i === 4 || i === 11)) || (s.id === 's5' && i === 2)
      attendance.push({
        id: `att-${s.id}-${i}`,
        studentId: s.id,
        className: s.className,
        date,
        status: absent ? 'Absent' : 'Present',
        markedBy: 't1',
      })
    }
  })

  const exams = [
    { id: 'e1', name: 'Periodic Test 1', term: 'Term 1', startDate: '2026-06-16', endDate: '2026-06-21', classes: ['8-A', '10-A', '5-B'] },
    { id: 'e2', name: 'Half Yearly', term: 'Term 1', startDate: '2026-09-10', endDate: '2026-09-20', classes: ['8-A', '10-A', '11-A', '12-B'] },
  ]

  const marks = [
    { id: 'm1', examId: 'e1', studentId: 's1', subject: 'English', max: 40, scored: 34 },
    { id: 'm2', examId: 'e1', studentId: 's1', subject: 'Mathematics', max: 40, scored: 36 },
    { id: 'm3', examId: 'e1', studentId: 's1', subject: 'Science', max: 40, scored: 31 },
    { id: 'm4', examId: 'e1', studentId: 's1', subject: 'Social Science', max: 40, scored: 33 },
    { id: 'm5', examId: 'e1', studentId: 's5', subject: 'English', max: 40, scored: 29 },
    { id: 'm6', examId: 'e1', studentId: 's5', subject: 'Mathematics', max: 40, scored: 38 },
    { id: 'm7', examId: 'e1', studentId: 's2', subject: 'English', max: 40, scored: 37 },
    { id: 'm8', examId: 'e1', studentId: 's2', subject: 'Mathematics', max: 40, scored: 35 },
  ]

  const fees = [
    { id: 'f1', studentId: 's1', head: 'Tuition Fee — Term 1', amount: 29000, dueDate: '2026-04-15', status: 'Paid' },
    { id: 'f2', studentId: 's1', head: 'Tuition Fee — Term 2', amount: 29000, dueDate: '2026-09-15', status: 'Pending' },
    { id: 'f3', studentId: 's1', head: 'Transport Fee — Term 2', amount: 9000, dueDate: '2026-09-15', status: 'Pending' },
    { id: 'f4', studentId: 's5', head: 'Examination Fee', amount: 2500, dueDate: '2026-08-01', status: 'Pending' },
    { id: 'f5', studentId: 's2', head: 'Tuition Fee — Term 2', amount: 29000, dueDate: '2026-09-15', status: 'Paid' },
  ]

  const payments = [
    { id: 'pay1', studentId: 's1', feeId: 'f1', amount: 29000, date: '2026-04-10', method: 'UPI', receiptNo: 'JV-RCPT-10021', status: 'Success' },
    { id: 'pay2', studentId: 's2', feeId: 'f5', amount: 29000, date: '2026-04-12', method: 'Card', receiptNo: 'JV-RCPT-10044', status: 'Success' },
  ]

  const notices = [
    { id: 'n1', title: 'Admissions Open for 2026–27', audience: 'Public', date: daysAgo(2), category: 'Admission', body: 'Applications are open for Nursery to Class XI. Apply online and retain your Application ID for tracking.' },
    { id: 'n2', title: 'Independence Day Assembly', audience: 'All', date: daysAgo(5), category: 'Event', body: 'Flag hoisting at 8:00 AM on 15 August. Students to report in house uniform.' },
    { id: 'n3', title: 'Periodic Test 1 Timetable', audience: 'Students', date: daysAgo(8), category: 'Exam', body: 'PT-1 begins 16 June. The detailed timetable is available in the student portal.' },
    { id: 'n4', title: 'Parent–Teacher Meeting', audience: 'Parents', date: daysAgo(1), category: 'PTM', body: 'PTM for Classes I–XII will be held on Saturday, 9:00 AM – 1:00 PM. Kindly book a slot via the parent portal.' },
    { id: 'n5', title: 'Holiday — Local Festival', audience: 'All', date: daysAgo(12), category: 'Holiday', body: 'The school will remain closed on Friday for the local festival. Regular classes resume on Monday.' },
  ]

  const events = [
    { id: 'ev1', name: 'Annual Day 2026', date: '2026-12-12', time: '5:00 PM', location: 'School Auditorium', category: 'Cultural', description: 'An evening of music, dance, drama, and student honour rolls. Parents are invited.', image: '/images/concert.jpg', registration: true },
    { id: 'ev2', name: 'Sports Day', date: '2026-11-08', time: '8:00 AM', location: 'Main Ground', category: 'Sports', description: 'Track and field, house relays, and marching. Students report in house T-shirts.', image: '/images/sports.jpg', registration: false },
    { id: 'ev3', name: 'Independence Day', date: '2026-08-15', time: '8:00 AM', location: 'Assembly Court', category: 'National', description: 'Flag hoisting, patriotic performances, and principal’s address.', image: '/images/assembly.jpg', registration: false },
    { id: 'ev4', name: 'Science Exhibition', date: '2026-08-22', time: '9:00 AM', location: 'Science Block', category: 'STEM', description: 'Working models, research posters, and robotics demos by Classes VI–XII.', image: '/images/lab.jpg', registration: true },
    { id: 'ev5', name: 'Parent–Teacher Meeting', date: '2026-08-30', time: '9:00 AM', location: 'Respective classrooms', category: 'PTM', description: 'Term review and academic guidance. Book a 10-minute slot with the class teacher.', image: '/images/classroom.jpg', registration: true },
    { id: 'ev6', name: 'Heritage Field Trip — Class V', date: '2026-10-04', time: '8:30 AM', location: 'City Museum', category: 'Trip', description: 'Guided museum visit. Consent forms must be submitted by 25 September.', image: '/images/kids.jpg', registration: true },
  ]

  const homework = [
    { id: 'hw1', className: '8-A', subject: 'English', title: 'Letter to the Editor', dueDate: daysAgo(-3), teacherId: 't1', description: 'Write a formal letter on the need for public libraries. 200–250 words.' },
    { id: 'hw2', className: '8-A', subject: 'Mathematics', title: 'Quadratic equations worksheet', dueDate: daysAgo(-2), teacherId: 't2', description: 'Complete exercise 4.3, questions 1–10. Show working.' },
    { id: 'hw3', className: '5-B', subject: 'EVS', title: 'Water cycle diagram', dueDate: daysAgo(-5), teacherId: 't3', description: 'Draw and label the water cycle. Use A4 sheet.' },
    { id: 'hw4', className: '10-A', subject: 'Science', title: 'Carbon compounds notes', dueDate: daysAgo(-1), teacherId: 't3', description: 'Revise SCERT in-text questions of Chapter 4.' },
  ]

  const assignments = [
    { id: 'as1', className: '8-A', subject: 'Social Science', title: 'Project: Local Government', dueDate: daysAgo(-10), teacherId: 't4', description: 'A 6-page illustrated project on municipal services in your ward.' },
    { id: 'as2', className: '11-A', subject: 'Computer Science', title: 'Python — File handling', dueDate: daysAgo(-7), teacherId: 't5', description: 'Write programs for reading, writing, and appending text files. Submit .py files.' },
  ]

  const studyMaterials = [
    { id: 'sm1', className: '8-A', subject: 'English', title: 'Poetry workbook — The Ant and the Cricket', type: 'PDF', uploadedBy: 't1' },
    { id: 'sm2', className: '10-A', subject: 'Mathematics', title: 'Trigonometry formula sheet', type: 'PDF', uploadedBy: 't2' },
    { id: 'sm3', className: '8-A', subject: 'Science', title: 'Force and Pressure — revision notes', type: 'Notes', uploadedBy: 't3' },
  ]

  const gallery = [
    { id: 'g1', title: 'Morning assembly', category: 'Campus', type: 'photo', src: '/images/assembly.jpg' },
    { id: 'g2', title: 'Smart classroom', category: 'Campus', type: 'photo', src: '/images/classroom.jpg' },
    { id: 'g3', title: 'Science lab practicals', category: 'STEM', type: 'photo', src: '/images/lab.jpg' },
    { id: 'g4', title: 'Library hour', category: 'Campus', type: 'photo', src: '/images/library.jpg' },
    { id: 'g5', title: 'Sports day heats', category: 'Sports', type: 'photo', src: '/images/sports.jpg' },
    { id: 'g6', title: 'Art studio', category: 'Cultural', type: 'photo', src: '/images/art.jpg' },
    { id: 'g7', title: 'Annual day rehearsal', category: 'Cultural', type: 'photo', src: '/images/music.jpg' },
    { id: 'g8', title: 'Computer lab', category: 'STEM', type: 'photo', src: '/images/computer.jpg' },
    { id: 'g9', title: 'Campus walk', category: 'Campus', type: 'photo', src: '/images/campus.jpg' },
    { id: 'g10', title: 'Student council', category: 'Student Life', type: 'photo', src: '/images/graduation.jpg' },
    { id: 'g11', title: 'Junior playground', category: 'Sports', type: 'photo', src: '/images/playground.jpg' },
    { id: 'g12', title: 'Field visit', category: 'Student Life', type: 'photo', src: '/images/kids.jpg' },
    { id: 'g13', title: 'School bus', category: 'Campus', type: 'photo', src: '/images/bus.jpg' },
    { id: 'g14', title: 'Cafeteria', category: 'Campus', type: 'photo', src: '/images/cafeteria.jpg' },
    { id: 'g15', title: 'Robotics lab', category: 'STEM', type: 'photo', src: '/images/robotics.jpg' },
    { id: 'g16', title: 'Annual day stage', category: 'Cultural', type: 'photo', src: '/images/concert.jpg' },
  ]

  const busRoutes = [
    { id: 'R1', name: 'North Loop', busNo: 'JV-12', driver: 'Suresh Naik', driverPhone: '9000000001', timing: '7:10 AM / 3:40 PM', stops: ['Lake View', 'Maple Residency', 'City Centre', 'Campus'] },
    { id: 'R2', name: 'East Loop', busNo: 'JV-18', driver: 'Imran Ali', driverPhone: '9000000002', timing: '7:20 AM / 3:40 PM', stops: ['Sunrise Villas', 'Market Junction', 'Temple Street', 'Campus'] },
    { id: 'R3', name: 'West Loop', busNo: 'JV-21', driver: 'Joseph Mathew', driverPhone: '9000000003', timing: '7:25 AM / 3:45 PM', stops: ['Orchid Towers', 'Green Park', 'Station Road', 'Campus'] },
  ]

  const leaveRequests = [
    { id: 'lv1', studentId: 's1', from: daysAgo(-4), to: daysAgo(-4), reason: 'Family function', status: 'Pending', requestedBy: 'p1' },
    { id: 'lv2', studentId: 's5', from: daysAgo(2), to: daysAgo(2), reason: 'Fever', status: 'Approved', requestedBy: 'p5' },
  ]

  const admissions = [
    { id: 'JV-2026-1042', studentName: 'Ishaan Verma', dob: '2022-05-11', gender: 'Male', classApplying: 'Nursery', previousSchool: '', parentName: 'Rohit Verma', phone: '9876599991', email: 'rohit.verma@email.com', address: '77, Palm Grove', status: 'Under Review', submittedOn: daysAgo(6), documents: ['Birth certificate'] },
    { id: 'JV-2026-1088', studentName: 'Sara Khan', dob: '2014-02-02', gender: 'Female', classApplying: 'Class VII', previousSchool: 'Green Valley Public School', parentName: 'Imran Khan', phone: '9876599992', email: 'imran.khan@email.com', address: '5, Rose Avenue', status: 'Assessment Scheduled', submittedOn: daysAgo(10), documents: ['TC', 'Report card'] },
  ]

  const timetable = [
    { className: '8-A', day: 'Monday', periods: ['English', 'Mathematics', 'Science', 'Break', 'Social Science', 'Hindi', 'PE'] },
    { className: '8-A', day: 'Tuesday', periods: ['Mathematics', 'English', 'Computer', 'Break', 'Science', 'Art', 'Social Science'] },
    { className: '8-A', day: 'Wednesday', periods: ['Science', 'Mathematics', 'English', 'Break', 'Hindi', 'Library', 'Games'] },
    { className: '8-A', day: 'Thursday', periods: ['Social Science', 'English', 'Mathematics', 'Break', 'Science', 'Computer', 'Life Skills'] },
    { className: '8-A', day: 'Friday', periods: ['English', 'Science', 'Mathematics', 'Break', 'Social Science', 'Music', 'Club'] },
    { className: '8-A', day: 'Saturday', periods: ['House activity', 'Mathematics support', 'Assembly', 'Break', 'Games', '—', '—'] },
  ].map((t) => ({ id: `tt-${t.className}-${t.day}`, ...t }))

  const messages = [
    { id: 'msg1', fromRole: 'parent', fromId: 'p1', toRole: 'teacher', toId: 't1', subject: 'Clarification on English homework', body: 'Could you confirm the word limit for the letter?', date: daysAgo(1), studentId: 's1' },
    { id: 'msg2', fromRole: 'teacher', fromId: 't1', toRole: 'parent', toId: 'p1', subject: 'Re: English homework', body: '200–250 words is fine. Please use the formal letter format taught in class.', date: daysAgo(1), studentId: 's1' },
  ]

  const users = [
    { id: 'u-admin', name: 'Admin Office', email: 'admin@jawaharvidyalam.edu', password: 'admin123', role: 'admin' },
    { id: 'u-t1', name: 'Anjali Menon', email: 'teacher@jawaharvidyalam.edu', password: 'teacher123', role: 'teacher', teacherId: 't1' },
    { id: 'u-p1', name: 'Priya Sharma', email: 'parent@jawaharvidyalam.edu', password: 'parent123', role: 'parent', parentId: 'p1' },
    { id: 'u-s1', name: 'Aarav Sharma', email: 'student@jawaharvidyalam.edu', password: 'student123', role: 'student', studentId: 's1' },
  ]

  return {
    users,
    teachers,
    parents,
    students,
    classes,
    subjects,
    attendance,
    exams,
    marks,
    fees,
    payments,
    notices,
    events,
    homework,
    assignments,
    studyMaterials,
    gallery,
    busRoutes,
    leaveRequests,
    admissions,
    enquiries: [],
    contacts: [],
    timetable,
    messages,
    eventRegistrations: [],
    settings: { ...DEFAULT_SETTINGS },
  }
}

// Seed data without login accounts; `_order` preserves list order in Firestore.
export function seedCollections() {
  const seed = buildSeed()
  delete seed.users
  for (const name of COLLECTIONS) {
    seed[name] = (seed[name] || []).map((row, i) => ({ ...row, _order: i }))
  }
  return seed
}

export { uid }
