function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    teal: "bg-teal-100 text-teal-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        {Icon && (
          <div
            className={`rounded-xl p-3 ${colors[color]}`}
          >
            <Icon size={28} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;