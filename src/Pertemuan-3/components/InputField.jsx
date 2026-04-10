export default function InputField({label,type = "text",placeholder = "",}) {
  return (
    <div className="mb-3">
      <label className="block text-blue-300 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}