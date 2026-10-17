import { useState } from 'react'
import { useSchool } from '../../context/SchoolContext'
import { uid } from '../../data/store'

// List fields are edited one item per line; blank lines are dropped on save.
function cleanLists(form) {
  return Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, Array.isArray(v) ? v.map((s) => String(s).trim()).filter(Boolean) : v]),
  )
}

export default function ResourceManager({ title, collection, columns, fields, idPrefix, allowCreate = true }) {
  const { db, update } = useSchool()
  const rows = db[collection] || []
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  function startCreate() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, f.default ?? '']))
    setForm(blank)
    setEditing('new')
  }

  function startEdit(row) {
    setForm({ ...row })
    setEditing(row.id)
  }

  async function save(e) {
    e.preventDefault()
    const values = cleanLists(form)
    const ok = await update((next) => {
      const list = next[collection]
      if (editing === 'new') {
        list.unshift({ id: uid(idPrefix), ...values })
      } else {
        const i = list.findIndex((r) => r.id === editing)
        if (i >= 0) list[i] = { ...list[i], ...values }
      }
      return next
    })
    if (ok) setEditing(null)
  }

  function remove(id) {
    if (!window.confirm('Delete this record?')) return
    update((next) => {
      next[collection] = next[collection].filter((r) => r.id !== id)
      return next
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="font-display text-3xl text-forest">{title}</h1>
        {allowCreate ? (
          <button onClick={startCreate} className="bg-forest text-white px-4 py-2 text-sm font-semibold">
            Add
          </button>
        ) : null}
      </div>
      {editing ? (
        <form onSubmit={save} className="bg-white p-5 mb-6 grid sm:grid-cols-2 gap-3 border border-cream-dark">
          {fields.map((f) => (
            <label key={f.key} className="text-sm">
              {f.label}
              {Array.isArray(form[f.key]) ? (
                <textarea
                  className="mt-1 w-full border px-3 py-2"
                  rows={3}
                  placeholder="One per line"
                  value={form[f.key].join('\n')}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value.split('\n') })}
                />
              ) : f.type === 'textarea' ? (
                <textarea
                  className="mt-1 w-full border px-3 py-2"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              ) : f.type === 'select' ? (
                <select
                  className="mt-1 w-full border px-3 py-2"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                >
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || 'text'}
                  className="mt-1 w-full border px-3 py-2"
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              )}
            </label>
          ))}
          <div className="sm:col-span-2 flex gap-2">
            <button className="bg-gold text-forest-deep px-4 py-2 text-sm font-semibold">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-sm">
              Cancel
            </button>
          </div>
        </form>
      ) : null}
      <div className="overflow-x-auto bg-white border border-cream-dark">
        <table className="w-full text-sm">
          <thead className="bg-forest text-white">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left p-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-6 text-center text-muted">
                  No records yet.
                </td>
              </tr>
            ) : null}
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-cream-dark">
                {columns.map((c) => (
                  <td key={c.key} className="p-3">
                    {c.render ? c.render(row) : Array.isArray(row[c.key]) ? row[c.key].join(', ') : String(row[c.key] ?? '—')}
                  </td>
                ))}
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => startEdit(row)} className="text-forest font-semibold mr-3">
                    Edit
                  </button>
                  <button onClick={() => remove(row.id)} className="text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
