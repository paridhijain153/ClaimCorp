function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`
        w-full
        h-11
        rounded-lg
        font-medium
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;