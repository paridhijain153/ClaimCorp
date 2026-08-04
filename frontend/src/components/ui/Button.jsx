function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-900 text-surface shadow-soft hover:bg-brand-800 focus-visible:ring-brand-900/20",

    secondary:
      "border border-border bg-surface text-brand-700 shadow-soft hover:bg-brand-50 hover:text-brand-900 focus-visible:ring-brand-900/20",

    danger:
      "bg-red-600 text-white shadow-soft hover:bg-red-700 focus-visible:ring-red-600/20",

    success:
      "bg-emerald-600 text-white shadow-soft hover:bg-emerald-700 focus-visible:ring-emerald-600/20",

    ghost:
      "text-brand-600 hover:bg-brand-50 hover:text-brand-900 focus-visible:ring-brand-900/20",

    "ghost-danger":
      "text-red-600 hover:bg-red-50 focus-visible:ring-red-600/20",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap
        rounded-lg px-4 py-2 text-sm font-medium
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;