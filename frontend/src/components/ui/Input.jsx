function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        className={`
          h-11
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;