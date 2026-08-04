import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import StatusBadge from "../common/StatusBadge";

function PendingExpensesTable({
  expenses,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Expense
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Employee
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Category
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Amount
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Status
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors duration-200 hover:bg-slate-50"
              >
                <td className="border-b border-slate-100 px-6 py-5">
                  <div className="max-w-xs">
                    <p className="truncate font-semibold text-slate-900">
                      {expense.title}
                    </p>

                    <p className="mt-1 text-xs font-medium tracking-wide text-slate-500">
                      {expense.expenseNumber}
                    </p>
                  </div>
                </td>

                <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5 text-slate-600">
                  {expense.employee.name}
                </td>

                <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5 text-slate-600">
                  {expense.category.name}
                </td>

                <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5 text-right font-semibold tabular-nums text-slate-900">
                  ₹{expense.totalAmount}
                </td>

                <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5">
                  <StatusBadge status={expense.status} />
                </td>

                <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5 text-right">
                  <Link
                    to={`/manager/expenses/${expense.id}`}
                    aria-label="View expense"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingExpensesTable;