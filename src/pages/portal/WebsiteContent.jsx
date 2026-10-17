import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useSchool } from '../../context/SchoolContext'

const TABS = [
  { id: 'profile', label: 'School profile' },
  { id: 'leaders', label: 'Leadership' },
  { id: 'contact', label: 'Contact & social' },
  { id: 'text', label: 'Home & About text' },
  { id: 'photos', label: 'Photos' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'academics', label: 'Academics' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'admissions', label: 'Admissions & fees' },
]

const PHOTO_LABELS = {
  hero: 'Home page banner',
  campus: 'Campus',
  founder: 'Founder',
  principal: 'Principal',
  chairman: 'Managing Director',
  kids: 'Admissions banner',
}

function getPath(obj, path) {
  return path.reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

function setPath(obj, path, value) {
  const next = structuredClone(obj)
  let cur = next
  path.slice(0, -1).forEach((k) => {
    if (cur[k] == null) cur[k] = {}
    cur = cur[k]
  })
  cur[path[path.length - 1]] = value
  return next
}

// Trims list entries edited as "one per line" and drops blank lines.
function clean(value) {
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) return value.map((v) => v.trim()).filter(Boolean)
    return value.map(clean)
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v)]))
  }
  return value
}

function Input({ label, value, onChange, type = 'text', rows }) {
  const cls = 'mt-1 w-full border border-cream-dark px-3 py-2 text-sm bg-white'
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      {type === 'textarea' ? (
        <textarea className={cls} rows={rows || 3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      ) : type === 'lines' ? (
        <textarea
          className={cls}
          rows={rows || 4}
          value={(value || []).join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n'))}
        />
      ) : type === 'checkbox' ? (
        <input type="checkbox" className="ml-2" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
      ) : (
        <input className={cls} type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

function Section({ title, hint, children }) {
  return (
    <section className="bg-white border border-cream-dark p-5 mb-6">
      <h2 className="font-display text-2xl text-forest">{title}</h2>
      {hint ? <p className="text-xs text-muted mt-1">{hint}</p> : null}
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  )
}

function ListEditor({ title, hint, items, fields, onChange }) {
  const list = items || []
  const move = (i, dir) => {
    const next = [...list]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, f.type === 'lines' ? [] : '']))
  return (
    <Section title={title} hint={hint}>
      {list.map((item, i) => (
        <div key={i} className="border border-cream-dark p-4 bg-cream/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-muted">#{i + 1}</span>
            <div className="flex gap-1">
              <button type="button" title="Move up" className="p-1.5 hover:bg-cream" onClick={() => move(i, -1)}>
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" title="Move down" className="p-1.5 hover:bg-cream" onClick={() => move(i, 1)}>
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Remove"
                className="p-1.5 text-red-700 hover:bg-red-50"
                onClick={() => window.confirm('Remove this item?') && onChange(list.filter((_, j) => j !== i))}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <div key={f.key} className={f.type === 'textarea' || f.type === 'lines' || f.wide ? 'sm:col-span-2' : ''}>
                <Input
                  label={f.label}
                  type={f.type}
                  value={item[f.key]}
                  onChange={(v) => onChange(list.map((it, j) => (j === i ? { ...it, [f.key]: v } : it)))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...list, blank()])}
        className="inline-flex items-center gap-2 text-sm font-semibold text-forest w-fit"
      >
        <Plus className="h-4 w-4" /> Add item
      </button>
    </Section>
  )
}

export default function WebsiteContent() {
  const { db, update } = useSchool()
  const [draft, setDraft] = useState(() => structuredClone(db.site))
  const [tab, setTab] = useState('profile')
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('')

  const val = (...path) => getPath(draft, path)
  const set = (path, value) => {
    setDraft((d) => setPath(d, path, value))
    setDirty(true)
    setStatus('')
  }
  const field = (label, path, type, extra = {}) => (
    <Input label={label} type={type} value={getPath(draft, path)} onChange={(v) => set(path, v)} {...extra} />
  )
  const list = (title, key, fields, hint) => (
    <ListEditor title={title} hint={hint} items={val(key)} fields={fields} onChange={(v) => set([key], v)} />
  )

  async function save() {
    setStatus('Saving…')
    const cleaned = clean(draft)
    const ok = await update((d) => {
      d.site = cleaned
      return d
    })
    if (ok) {
      setDraft(cleaned)
      setDirty(false)
      setStatus('Saved. The website is updated.')
    } else {
      setStatus('')
    }
  }

  function discard() {
    if (!window.confirm('Discard unsaved changes?')) return
    setDraft(structuredClone(db.site))
    setDirty(false)
    setStatus('')
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-forest">Website content</h1>
          <p className="text-sm text-muted mt-1">Everything shown on the public website. Changes go live as soon as you save.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 text-sm border ${tab === t.id ? 'bg-forest text-white border-forest' : 'bg-white border-cream-dark text-forest'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 pb-24">
        {tab === 'profile' ? (
          <>
            <Section title="School details">
              <div className="grid sm:grid-cols-2 gap-4">
                {field('School name', ['school', 'name'])}
                {field('Location label', ['school', 'locationLabel'])}
                {field('Motto', ['school', 'motto'])}
                {field('Motto meaning', ['school', 'mottoMeaning'])}
                {field('Established (year)', ['school', 'established'])}
                {field('Classes offered', ['school', 'classes'])}
                {field('Board', ['school', 'board'])}
                {field('Board detail', ['school', 'boardDetail'])}
                {field('Syllabus label', ['school', 'boardShort'])}
                {field('Medium of instruction', ['school', 'medium'])}
                {field('School type', ['school', 'type'])}
                {field('Recognition / affiliation no.', ['school', 'affiliationNo'])}
                {field('School code', ['school', 'schoolCode'])}
              </div>
            </Section>
            <ListEditor
              title="Home page numbers"
              hint="The four highlight figures shown under the home page banner."
              items={val('school', 'stats')}
              fields={[
                { key: 'value', label: 'Value (e.g. 1,800+)' },
                { key: 'label', label: 'Label' },
              ]}
              onChange={(v) => set(['school', 'stats'], v)}
            />
          </>
        ) : null}

        {tab === 'leaders' ? (
          ['principal', 'chairman', 'founder'].map((who) => (
            <Section key={who} title={who === 'chairman' ? 'Managing Director' : who[0].toUpperCase() + who.slice(1)}>
              <div className="grid sm:grid-cols-2 gap-4">
                {field('Name', ['school', who, 'name'])}
                {field('Title', ['school', who, 'title'])}
              </div>
              {field('Message', ['school', who, 'message'], 'textarea', { rows: 6 })}
              <PhotoField label="Photo" value={val('images', who)} onChange={(v) => set(['images', who], v)} />
            </Section>
          ))
        ) : null}

        {tab === 'contact' ? (
          <>
            <Section title="Address & phones">
              <div className="grid sm:grid-cols-2 gap-4">
                {field('Address line 1', ['school', 'contact', 'addressLine1'])}
                {field('Address line 2', ['school', 'contact', 'addressLine2'])}
                {field('City', ['school', 'contact', 'city'])}
                {field('State', ['school', 'contact', 'state'])}
                {field('PIN code', ['school', 'contact', 'pincode'])}
                {field('Office hours', ['school', 'contact', 'officeHours'])}
                {field('Admissions phone (shown in header)', ['school', 'contact', 'phone'])}
                {field('Office phone', ['school', 'contact', 'officePhone'])}
                {field('Principal’s office phone', ['school', 'contact', 'principalPhone'])}
                {field('Emergency phone', ['school', 'contact', 'emergency'])}
                {field('Email', ['school', 'contact', 'email'], 'email')}
                {field('Admissions email', ['school', 'contact', 'admissionsEmail'], 'email')}
              </div>
              {field('Google Maps search text', ['school', 'contact', 'mapQuery'])}
            </Section>
            <Section title="Social media links">
              <div className="grid sm:grid-cols-2 gap-4">
                {field('Facebook', ['school', 'social', 'facebook'], 'url')}
                {field('Instagram', ['school', 'social', 'instagram'], 'url')}
                {field('YouTube', ['school', 'social', 'youtube'], 'url')}
                {field('X / Twitter', ['school', 'social', 'twitter'], 'url')}
              </div>
            </Section>
          </>
        ) : null}

        {tab === 'text' ? (
          <>
            <Section title="Home page">
              {field('Banner sentence', ['school', 'home', 'heroText'], 'textarea', { rows: 2 })}
              {field('About section heading', ['school', 'home', 'aboutTitle'])}
              {field('About paragraph 1', ['school', 'home', 'about'], 'textarea')}
              {field('About paragraph 2', ['school', 'home', 'about2'], 'textarea')}
            </Section>
            <Section title="About page">
              {field('Story heading', ['school', 'about', 'storyTitle'])}
              {field('Story paragraph 1', ['school', 'about', 'story'], 'textarea')}
              {field('Story paragraph 2', ['school', 'about', 'story2'], 'textarea')}
              {field('Vision heading', ['school', 'about', 'visionTitle'])}
              {field('Vision', ['school', 'about', 'vision'], 'textarea')}
              {field('Mission heading', ['school', 'about', 'missionTitle'])}
              {field('Mission', ['school', 'about', 'mission'], 'textarea')}
            </Section>
          </>
        ) : null}

        {tab === 'photos' ? (
          <Section
            title="Website photos"
            hint="Paste an image link (https://…) or a path from the website's images folder (e.g. /images/campus.jpg)."
          >
            <div className="grid md:grid-cols-2 gap-5">
              {Object.keys(draft.images || {}).map((key) => (
                <PhotoField
                  key={key}
                  label={PHOTO_LABELS[key] || key[0].toUpperCase() + key.slice(1)}
                  value={val('images', key)}
                  onChange={(v) => set(['images', key], v)}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {tab === 'highlights' ? (
          <>
            {list('Why families choose us (Home)', 'whyChoose', [
              { key: 'title', label: 'Title' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ])}
            {list('Achievements (Home & About)', 'achievements', [
              { key: 'year', label: 'Year' },
              { key: 'category', label: 'Category' },
              { key: 'title', label: 'Achievement', wide: true },
            ])}
            {list('Testimonials (Home)', 'testimonials', [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role (e.g. Parent of Class V student)' },
              { key: 'quote', label: 'Quote', type: 'textarea' },
            ])}
            {list('Core values (About)', 'coreValues', [
              { key: 'name', label: 'Value' },
              { key: 'text', label: 'Description', type: 'textarea' },
            ])}
            <Section title="Recognition (About)" hint="One per line.">
              {field('Affiliations & recognition', ['accreditations'], 'lines')}
            </Section>
            {list('Faculty highlights (About)', 'facultyHighlights', [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'subject', label: 'Subject' },
              { key: 'photo', label: 'Photo link or /images/… path' },
            ])}
          </>
        ) : null}

        {tab === 'academics' ? (
          <>
            {list(
              'Programmes',
              'programs',
              [
                { key: 'name', label: 'Name' },
                { key: 'slug', label: 'URL slug (e.g. primary)' },
                { key: 'grades', label: 'Grades' },
                { key: 'ages', label: 'Ages' },
                { key: 'summary', label: 'Summary', type: 'textarea' },
                { key: 'points', label: 'Key points (one per line)', type: 'lines' },
              ],
              'The URL slug decides the page address, e.g. /academics/primary.',
            )}
            <Section title="Subjects by stage" hint="One subject per line.">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(draft.subjectsByStage || {}).map((stage) => (
                  <div key={stage}>{field(stage, ['subjectsByStage', stage], 'lines', { rows: 6 })}</div>
                ))}
              </div>
            </Section>
            {list('Examination & evaluation', 'examSystem', [
              { key: 'title', label: 'Title' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ])}
            {list('Academic calendar', 'academicCalendar', [
              { key: 'month', label: 'Month' },
              { key: 'items', label: 'Events (one per line)', type: 'lines' },
            ])}
            {list('School timings', 'schoolTimings', [
              { key: 'group', label: 'Group' },
              { key: 'time', label: 'Time' },
            ])}
          </>
        ) : null}

        {tab === 'facilities'
          ? list('Facilities', 'facilities', [
              { key: 'name', label: 'Name' },
              { key: 'image', label: 'Photo link or /images/… path' },
              { key: 'desc', label: 'Description', type: 'textarea' },
            ])
          : null}

        {tab === 'admissions' ? (
          <>
            {list('Admission steps', 'admissionSteps', [
              { key: 'step', label: 'Step number' },
              { key: 'title', label: 'Title' },
              { key: 'text', label: 'Text', type: 'textarea' },
            ])}
            {list('Important dates', 'admissionDates', [
              { key: 'label', label: 'Label' },
              { key: 'date', label: 'Date' },
            ])}
            {list('Age eligibility', 'eligibility', [
              { key: 'grade', label: 'Class' },
              { key: 'age', label: 'Age rule' },
            ])}
            <Section title="Required documents" hint="One per line.">
              {field('Documents', ['requiredDocuments'], 'lines', { rows: 8 })}
            </Section>
            {list('Admission FAQs', 'admissionFaqs', [
              { key: 'q', label: 'Question', wide: true },
              { key: 'a', label: 'Answer', type: 'textarea' },
            ])}
            {list('Fee structure', 'feeStructure', [
              { key: 'head', label: 'Fee head', wide: true },
              { key: 'nursery', label: 'Nursery–UKG' },
              { key: 'primary', label: 'Primary' },
              { key: 'middle', label: 'Middle' },
              { key: 'high', label: 'High' },
            ])}
          </>
        ) : null}
      </div>

      <div className="fixed bottom-0 inset-x-0 md:left-64 z-30 bg-white border-t border-cream-dark px-6 py-3 flex items-center justify-end gap-4">
        <span className="text-sm text-muted mr-auto">{status || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}</span>
        <button type="button" disabled={!dirty} onClick={discard} className="text-sm text-forest disabled:opacity-40">
          Discard
        </button>
        <button
          type="button"
          disabled={!dirty || status === 'Saving…'}
          onClick={save}
          className="bg-forest text-white px-5 py-2 text-sm font-semibold disabled:opacity-40"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}

function PhotoField({ label, value, onChange }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="h-20 w-20 shrink-0 bg-cream border border-cream-dark overflow-hidden">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <div className="flex-1">
        <Input label={label} value={value} onChange={onChange} />
      </div>
    </div>
  )
}
