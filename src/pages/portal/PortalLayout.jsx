import {
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  ClipboardList,
  Globe,
  GraduationCap,
  Image,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Users,
} from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Logo from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'

const menus = {
  admin: [
    { to: '/portal/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/portal/admin/students', icon: GraduationCap, label: 'Students' },
    { to: '/portal/admin/parents', icon: Users, label: 'Parents' },
    { to: '/portal/admin/teachers', icon: Users, label: 'Teachers' },
    { to: '/portal/admin/classes', icon: BookOpen, label: 'Classes' },
    { to: '/portal/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { to: '/portal/admin/attendance', icon: ClipboardList, label: 'Attendance' },
    { to: '/portal/admin/exams', icon: ClipboardList, label: 'Exams' },
    { to: '/portal/admin/results', icon: GraduationCap, label: 'Results' },
    { to: '/portal/admin/fees', icon: IndianRupee, label: 'Fees' },
    { to: '/portal/admin/admissions', icon: ClipboardList, label: 'Admissions' },
    { to: '/portal/admin/enquiries', icon: Mail, label: 'Enquiries' },
    { to: '/portal/admin/registrations', icon: CalendarDays, label: 'Event registrations' },
    { to: '/portal/admin/notices', icon: Bell, label: 'Notices' },
    { to: '/portal/admin/events', icon: CalendarDays, label: 'Events' },
    { to: '/portal/admin/homework', icon: BookOpen, label: 'Homework' },
    { to: '/portal/admin/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/portal/admin/gallery', icon: Image, label: 'Gallery' },
    { to: '/portal/admin/documents', icon: BookOpen, label: 'Documents' },
    { to: '/portal/admin/transport', icon: Bus, label: 'Transport' },
    { to: '/portal/admin/reports', icon: ClipboardList, label: 'Reports' },
    { to: '/portal/admin/website', icon: Globe, label: 'Website content' },
    { to: '/portal/admin/settings', icon: Settings, label: 'Settings' },
  ],
  teacher: [
    { to: '/portal/teacher', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/portal/teacher/profile', icon: Users, label: 'Profile' },
    { to: '/portal/teacher/attendance', icon: ClipboardList, label: 'Mark attendance' },
    { to: '/portal/teacher/marks', icon: GraduationCap, label: 'Enter marks' },
    { to: '/portal/teacher/homework', icon: BookOpen, label: 'Homework' },
    { to: '/portal/teacher/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/portal/teacher/materials', icon: BookOpen, label: 'Study materials' },
    { to: '/portal/teacher/notices', icon: Bell, label: 'Announcements' },
    { to: '/portal/teacher/students', icon: Users, label: 'Students' },
    { to: '/portal/teacher/messages', icon: Mail, label: 'Parent messages' },
    { to: '/portal/teacher/leave', icon: CalendarDays, label: 'Leave requests' },
    { to: '/portal/teacher/timetable', icon: CalendarDays, label: 'Timetable' },
  ],
  parent: [
    { to: '/portal/parent', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/portal/parent/child', icon: Users, label: 'Child profile' },
    { to: '/portal/parent/attendance', icon: ClipboardList, label: 'Attendance' },
    { to: '/portal/parent/results', icon: GraduationCap, label: 'Results' },
    { to: '/portal/parent/fees', icon: IndianRupee, label: 'Fee payments' },
    { to: '/portal/parent/notices', icon: Bell, label: 'Notices' },
    { to: '/portal/parent/homework', icon: BookOpen, label: 'Homework' },
    { to: '/portal/parent/messages', icon: Bell, label: 'Teacher messages' },
    { to: '/portal/parent/leave', icon: CalendarDays, label: 'Leave requests' },
  ],
  student: [
    { to: '/portal/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/portal/student/profile', icon: Users, label: 'Profile' },
    { to: '/portal/student/attendance', icon: ClipboardList, label: 'Attendance' },
    { to: '/portal/student/timetable', icon: CalendarDays, label: 'Timetable' },
    { to: '/portal/student/homework', icon: BookOpen, label: 'Homework' },
    { to: '/portal/student/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/portal/student/exams', icon: ClipboardList, label: 'Exam schedule' },
    { to: '/portal/student/results', icon: GraduationCap, label: 'Results' },
    { to: '/portal/student/notices', icon: Bell, label: 'Notices' },
    { to: '/portal/student/materials', icon: BookOpen, label: 'Study materials' },
    { to: '/portal/student/fees', icon: IndianRupee, label: 'Fee status' },
  ],
}

export default function PortalLayout() {
  const { user, logout } = useAuth()
  const items = menus[user.role] || []

  return (
    <div className="min-h-svh bg-cream flex">
      <aside className="hidden md:flex w-64 flex-col bg-forest-deep text-white">
        <Link to="/" className="flex items-center gap-2 px-4 h-16 border-b border-white/10">
          <Logo className="h-9 w-9" light />
          <span className="font-display text-xl">Vidyalayam</span>
        </Link>
        <nav className="flex-1 overflow-y-auto portal-scroll py-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 text-sm ${isActive ? 'bg-white/10 text-gold-light' : 'text-white/80 hover:bg-white/5'}`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-4 text-sm text-white/70 hover:text-white border-t border-white/10">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b border-cream-dark flex items-center justify-between px-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{user.role} portal</p>
            <p className="font-semibold text-forest">{user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-forest hidden sm:inline">Public website</Link>
            <button onClick={logout} className="md:hidden text-sm font-semibold text-forest">Sign out</button>
          </div>
        </header>
        <div className="md:hidden overflow-x-auto bg-forest text-white text-sm">
          <div className="flex min-w-max">
            {items.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className="px-3 py-3 whitespace-nowrap">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
