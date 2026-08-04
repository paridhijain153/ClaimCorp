function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold tracking-tight text-brand-900 sm:text-2xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-brand-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex shrink-0 items-center">
          {action}
        </div>
      )}
    </div>
  );
}

export default PageHeader;