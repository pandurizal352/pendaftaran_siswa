import React from 'react'

export default function Table({ columns = [], data = [], rowKey = 'id', actions }) {
  return (
    <div className="overflow-x-auto rounded border bg-white shadow">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2 text-left text-sm font-semibold text-gray-600">{c.title}</th>
            ))}
            {actions && <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="border-t px-4 py-2 text-sm">{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
              ))}
              {actions && <td className="border-t px-4 py-2 text-sm">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
