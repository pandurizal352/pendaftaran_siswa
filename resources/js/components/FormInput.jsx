import React from 'react'

export default function FormInput({ label, name, type = 'text', value, onChange, required, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-700">{label}</span>
      {type === 'select' ? (
        <select name={name} value={value} onChange={onChange} required={required} className="w-full rounded border p-2" {...props}>
          {children}
        </select>
      ) : type === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} required={required} className="w-full rounded border p-2" {...props} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} required={required} className="w-full rounded border p-2" {...props} />
      )}
    </label>
  )
}
