import { FileSearch } from "lucide-react";

function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 px-6 text-center">
      
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
        <FileSearch
          size={32}
          strokeWidth={1.5}
          className="text-brand-400"
        />
      </div>

      <h3 className="mt-5 text-base font-semibold text-brand-900">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-brand-500">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
      
    </div>
  );
}

export default EmptyState;