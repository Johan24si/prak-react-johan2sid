export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
      />
    </div>
  );
}
