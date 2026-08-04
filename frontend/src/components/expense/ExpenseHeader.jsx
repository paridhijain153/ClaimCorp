import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";

function ExpenseHeader({ expense }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-medium text-brand-500 transition-colors hover:text-brand-900"
      >
        <ArrowLeft size={16} />
        Back to Previous Page
      </button>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-900 sm:text-2xl">
            {expense.title}
          </h1>
          <p className="mt-0.5 text-xs font-mono text-brand-400">
            {expense.expenseNumber}
          </p>
        </div>

        <div>
          <StatusBadge status={expense.status} />
        </div>
      </div>
    </div>
  );
}

export default ExpenseHeader;