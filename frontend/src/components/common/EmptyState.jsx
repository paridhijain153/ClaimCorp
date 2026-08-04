import { FileSearch } from "lucide-react";

function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">

      <div className="rounded-full bg-slate-100 p-5">
        <FileSearch
          size={40}
          className="text-slate-500"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;