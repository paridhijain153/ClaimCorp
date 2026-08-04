function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-brand-900">
          {label}
        </label>
      )}

      <input
        className={`
          block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 placeholder:text-brand-400 shadow-soft
          transition-all duration-200 ease-out
          focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20
          disabled:cursor-not-allowed disabled:bg-brand-50 disabled:text-brand-500
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-600/20" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;