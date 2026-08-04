import Card from "../ui/Card";

function DataTable({
  title,
  description,
  actions,
  children,
}) {
  return (
    <Card className="overflow-hidden p-0">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-200 bg-slate-50/50 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-3">
            {actions}
          </div>
        )}
      </div>

      <div className="bg-white">
        {children}
      </div>
    </Card>
  );
}

export default DataTable;