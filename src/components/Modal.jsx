export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {children}
        </div>

      </div>
    </div>
  );
}
