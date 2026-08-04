import { X } from "lucide-react";

function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-brand-900">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-xs text-brand-500">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-400 transition-colors hover:bg-brand-50 hover:text-brand-900 focus:outline-none"
          >
            <X size={18} />
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