import Card from "../ui/Card";

function DataTable({
  title,
  description,
  actions,
  children,
}) {
  return (
    <Card className="overflow-hidden !p-0">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border bg-surface px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 max-w-2xl text-sm text-brand-500">
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

      <div className="w-full overflow-x-auto bg-surface">
        {children}
      </div>
    </Card>
  );
}

export default DataTable;