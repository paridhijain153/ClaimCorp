import Card from "../ui/Card";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  className = "",
}) {
  return (
    <Card className={`h-full flex flex-col justify-between p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-brand-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl tabular-nums">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-brand-700 shadow-soft">
            <Icon
              size={18}
              className={color || "text-brand-700"}
              strokeWidth={2}
            />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-4 text-xs font-medium text-brand-400">
          {subtitle}
        </p>
      )}
    </Card>
  );
}

export default StatCard;