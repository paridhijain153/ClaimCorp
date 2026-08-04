function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
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