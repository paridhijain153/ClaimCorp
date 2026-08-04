import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function CategoriesTable({
  categories,
  onToggleStatus,
}) {
  return (
    <DataTable
      title="Expense Categories"
      description="Categories available for employees while creating expenses."
    >
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Category
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
          {categories.length === 0 ? (
            <TableEmpty
              title="No Categories"
              description="Create your first expense category."
            />
          ) : (
            categories.map((category) => (
              <tr
                key={category.id}
                className="transition-colors duration-200 hover:bg-brand-50"
              >
                <td className="border-b border-border px-6 py-4">
                  <p className="font-semibold text-brand-900">
                    {category.name}
                  </p>
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <StatusBadge
                    status={
                      category.isActive
                        ? "APPROVED"
                        : "REJECTED"
                    }
                  />
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-right">
                  <Button
                    variant={
                      category.isActive
                        ? "ghost-danger"
                        : "ghost-success"
                    }
                    onClick={() =>
                      onToggleStatus(category)
                    }
                  >
                    {category.isActive ? (
                      <>
                        <XCircle
                          size={16}
                          className="mr-2"
                        />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <CheckCircle
                          size={16}
                          className="mr-1.5"
                        />
                        Activate
                      </>
                    )}
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

export default CategoriesTable;