import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import { AuthProvider } from './context/AuthContext'
import { SchoolProvider } from './context/SchoolContext'
import About from './pages/About'
import Academics from './pages/Academics'
import Admissions from './pages/Admissions'
import Apply from './pages/Apply'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Facilities from './pages/Facilities'
import FeesPage from './pages/FeesPage'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Login from './pages/Login'
import Notices from './pages/Notices'
import Syllabus from './pages/Syllabus'
import Track from './pages/Track'
import Transport from './pages/Transport'
import {
  AdminAdmissions,
  AdminAssignments,
  AdminAttendance,
  AdminClasses,
  AdminDashboard,
  AdminDocuments,
  AdminEvents,
  AdminExams,
  AdminFees,
  AdminGallery,
  AdminHomework,
  AdminNotices,
  AdminParents,
  AdminReports,
  AdminResults,
  AdminSettings,
  AdminStudents,
  AdminSubjects,
  AdminTeachers,
  AdminTransport,
} from './pages/portal/AdminPages'
import PortalLayout from './pages/portal/PortalLayout'
import RequireAuth from './pages/portal/RequireAuth'
import {
  ChildProfile,
  FamilyAttendance,
  FamilyFees,
  FamilyHomework,
  FamilyNotices,
  FamilyResults,
  ParentDashboard,
  ParentLeave,
  ParentMessages,
  StudentAssignments,
  StudentDashboard,
  StudentExams,
  StudentMaterials,
  StudentTimetable,
  TeacherAssignments,
  TeacherAttendance,
  TeacherDashboard,
  TeacherHomework,
  TeacherLeave,
  TeacherMarks,
  TeacherMaterials,
  TeacherNotices,
  TeacherProfile,
  TeacherStudents,
  TeacherTimetable,
} from './pages/portal/RolePages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SchoolProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/academics/syllabus" element={<Syllabus />} />
              <Route path="/academics/:program" element={<Academics />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/admissions/apply" element={<Apply />} />
              <Route path="/admissions/track" element={<Track />} />
              <Route path="/admissions/fees" element={<FeesPage />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth role="admin" />}>
              <Route path="/portal/admin" element={<PortalLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="parents" element={<AdminParents />} />
                <Route path="teachers" element={<AdminTeachers />} />
                <Route path="classes" element={<AdminClasses />} />
                <Route path="subjects" element={<AdminSubjects />} />
                <Route path="attendance" element={<AdminAttendance />} />
                <Route path="exams" element={<AdminExams />} />
                <Route path="results" element={<AdminResults />} />
                <Route path="fees" element={<AdminFees />} />
                <Route path="admissions" element={<AdminAdmissions />} />
                <Route path="notices" element={<AdminNotices />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="homework" element={<AdminHomework />} />
                <Route path="assignments" element={<AdminAssignments />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="documents" element={<AdminDocuments />} />
                <Route path="transport" element={<AdminTransport />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route element={<RequireAuth role="teacher" />}>
              <Route path="/portal/teacher" element={<PortalLayout />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="profile" element={<TeacherProfile />} />
                <Route path="attendance" element={<TeacherAttendance />} />
                <Route path="marks" element={<TeacherMarks />} />
                <Route path="homework" element={<TeacherHomework />} />
                <Route path="assignments" element={<TeacherAssignments />} />
                <Route path="materials" element={<TeacherMaterials />} />
                <Route path="notices" element={<TeacherNotices />} />
                <Route path="students" element={<TeacherStudents />} />
                <Route path="leave" element={<TeacherLeave />} />
                <Route path="timetable" element={<TeacherTimetable />} />
              </Route>
            </Route>

            <Route element={<RequireAuth role="parent" />}>
              <Route path="/portal/parent" element={<PortalLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path="child" element={<ChildProfile />} />
                <Route path="attendance" element={<FamilyAttendance />} />
                <Route path="results" element={<FamilyResults />} />
                <Route path="fees" element={<FamilyFees />} />
                <Route path="notices" element={<FamilyNotices />} />
                <Route path="homework" element={<FamilyHomework />} />
                <Route path="messages" element={<ParentMessages />} />
                <Route path="leave" element={<ParentLeave />} />
              </Route>
            </Route>

            <Route element={<RequireAuth role="student" />}>
              <Route path="/portal/student" element={<PortalLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="profile" element={<ChildProfile />} />
                <Route path="attendance" element={<FamilyAttendance />} />
                <Route path="timetable" element={<StudentTimetable />} />
                <Route path="homework" element={<FamilyHomework />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="exams" element={<StudentExams />} />
                <Route path="results" element={<FamilyResults />} />
                <Route path="notices" element={<FamilyNotices />} />
                <Route path="materials" element={<StudentMaterials />} />
                <Route path="fees" element={<FamilyFees />} />
              </Route>
            </Route>

            <Route path="/portal" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </SchoolProvider>
    </BrowserRouter>
  )
}
