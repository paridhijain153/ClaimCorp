function Card({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.02),0_12px_26px_-20px_rgba(15,23,42,0.28)] sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;