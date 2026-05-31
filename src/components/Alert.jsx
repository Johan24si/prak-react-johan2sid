export default function Alert({ children, type = "info", onClose }) {
  const types = {
    info:    "bg-blue-50 border-blue-400 text-blue-800",
    success: "bg-green-50 border-green-400 text-green-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
    danger:  "bg-red-50 border-red-400 text-red-800",
  };

  const icons = {
    info:    "ℹ️",
    success: "✅",
    warning: "⚠️",
    danger:  "❌",
  };

  return (
    <div className={`flex items-start gap-3 border-l-4 rounded-lg px-4 py-3 mb-4 ${types[type]}`}>
      <span className="text-lg">{icons[type]}</span>

      <p className="text-sm flex-1">{children}</p>

      {onClose && (
        <button
          onClick={onClose}
          className="text-lg leading-none opacity-60 hover:opacity-100 transition"
        >
          ×
        </button>
      )}
    </div>
  );
}
