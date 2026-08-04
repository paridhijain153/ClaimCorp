import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExpenseHeader({ expense }) {
  const navigate = useNavigate();

  const statusColors = {
    DRAFT:
      "bg-yellow-100 text-yellow-700",

    SUBMITTED:
      "bg-blue-100 text-blue-700",

    APPROVED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",

    REIMBURSED:
      "bg-purple-100 text-purple-700",
  };

  return (
    <div className="space-y-6">

      <button
        onClick={() =>
          navigate("/employee/expenses")
        }
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} />

        Back to My Expenses
      </button>

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {expense.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {expense.expenseNumber}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            statusColors[
              expense.status
            ]
          }`}
        >
          {expense.status}
        </span>

      </div>

    </div>
  );
}

export default ExpenseHeader;