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
    <Card className={`h-full flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
            {value}
          </h2>
        </div>

        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700">
            <Icon
              size={18}
              className={color || "text-slate-600"}
              strokeWidth={2.2}
            />
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-4 text-xs font-medium text-slate-500">
          {subtitle}
        </p>
      )}
    </Card>
  );
}

export default StatCard;