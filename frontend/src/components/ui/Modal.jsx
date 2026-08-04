function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
}

export default Modal;