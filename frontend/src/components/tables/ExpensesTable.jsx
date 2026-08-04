import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function ExpensesTable({
  expenses,
}) {
  const navigate = useNavigate();

  return (
    <DataTable
      title="My Expenses"
      description="Track and review all your submitted expense claims."
    >
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Title
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
              title="No expenses found"
              description="You haven't created any expense claims yet."
            />
          ) : (
            expenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors duration-200 hover:bg-brand-50"
              >
                <td className="border-b border-border px-6 py-4 font-semibold text-brand-900">
                  <div className="max-w-xs truncate">
                    {expense.title}
                  </div>
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-brand-600">
                  {expense.category?.name}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-right font-semibold tabular-nums text-brand-900">
                  ₹{expense.amount}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <StatusBadge status={expense.status} />
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      navigate(`/employee/expenses/${expense.id}`)
                    }
                    aria-label="View expense details"
                    className="!py-1.5 !px-3"
                  >
                    <Eye size={16} className="mr-1.5 text-brand-500" />
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DataTable>
  );
}

export default ExpensesTable;