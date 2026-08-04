function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-slate-900 text-white shadow-sm hover:bg-slate-800",

    secondary:
      "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900",

    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700",

    success:
      "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700",

    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",

    "ghost-danger":
      "text-red-600 hover:bg-red-50",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        rounded-xl
        px-4
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-200
        ease-out
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-400
        focus-visible:ring-offset-1
        disabled:pointer-events-none
        disabled:opacity-50
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