import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function PendingExpensesTable({
  expenses,
}) {
  return (
    <DataTable
      title="Pending Approvals"
      description="Review and action submitted expense claims from your team."
    >
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Expense
            </th>

            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Employee
            </th>

            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Category
            </th>

            <th className="border-b border-border px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-brand-500">
              Amount
            </th>

            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Status
            </th>

            <th className="border-b border-border px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-brand-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {!expenses || expenses.length === 0 ? (
            <TableEmpty
              title="No pending approvals"
              description="All expense claims have been reviewed."
            />
          ) : (
            expenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors duration-200 hover:bg-brand-50"
              >
                <td className="border-b border-border px-6 py-4">
                  <div className="max-w-xs">
                    <p className="truncate font-semibold text-brand-900">
                      {expense.title}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-brand-400">
                      {expense.expenseNumber}
                    </p>
                  </div>
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-brand-600">
                  {expense.employee?.name}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-brand-600">
                  {expense.category?.name}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-right font-semibold tabular-nums text-brand-900">
                  ₹{expense.totalAmount}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <StatusBadge status={expense.status} />
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-right">
                  <Link to={`/manager/expenses/${expense.id}`}>
                    <Button
                      variant="ghost"
                      aria-label="View expense details"
                      className="!py-1.5 !px-3"
                    >
                      <Eye size={16} className="mr-1.5 text-brand-500" />
                      Review
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DataTable>
  );
}

export default PendingExpensesTable;