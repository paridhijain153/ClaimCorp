function Card({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 shadow-card sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;