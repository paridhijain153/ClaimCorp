function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <input
        className={`
          block
          w-full
          rounded-lg
          border
          border-gray-200
          bg-white
          px-3
          py-2
          text-sm
          text-gray-900
          placeholder:text-gray-400
          transition-colors
          focus:border-blue-500
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          disabled:cursor-not-allowed
          disabled:bg-gray-50
          disabled:text-gray-500
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;