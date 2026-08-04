import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";

function CategoriesTable({
  categories,
}) {
  return (
    <DataTable
      title="Expense Categories"
      description="Categories available for employees while creating expenses."
    >
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Category
              </th>

              <th className="border-b border-slate-200 px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Status
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
                  className="transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="border-b border-slate-100 px-6 py-5">
                    <p className="font-semibold text-slate-900">
                      {category.name}
                    </p>
                  </td>

                  <td className="whitespace-nowrap border-b border-slate-100 px-6 py-5">
                    <StatusBadge
                      status={
                        category.isActive
                          ? "APPROVED"
                          : "REJECTED"
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DataTable>
  );
}

export default CategoriesTable;