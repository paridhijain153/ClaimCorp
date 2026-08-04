import {
  CheckCircle,
  XCircle,
} from "lucide-react";

import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function UsersTable({
  users,
  onToggleStatus,
}) {
  return (
    <DataTable
      title="Users"
      description="Manage employees and managers."
    >
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="border-b border-gray-200 px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>

              <th className="border-b border-gray-200 px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>

              <th className="border-b border-gray-200 px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>

              <th className="border-b border-gray-200 px-6 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="border-b border-gray-200 px-6 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <TableEmpty
                title="No users found"
                description="Create your first employee or manager."
              />
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap border-b border-gray-100 px-6 py-3.5">
                    <p className="font-medium text-gray-900">
                      {user.name}
                    </p>
                  </td>

                  <td className="whitespace-nowrap border-b border-gray-100 px-6 py-3.5 text-gray-500">
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap border-b border-gray-100 px-6 py-3.5">
                    <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="whitespace-nowrap border-b border-gray-100 px-6 py-3.5">
                    <StatusBadge
                      status={
                        user.isActive
                          ? "APPROVED"
                          : "REJECTED"
                      }
                    />
                  </td>

                  <td className="whitespace-nowrap border-b border-gray-100 px-6 py-3.5 text-right">
                    <Button
                      variant={
                        user.isActive
                          ? "ghost-danger"
                          : "ghost"
                      }
                      onClick={() =>
                        onToggleStatus(user)
                      }
                      className="!py-1.5 !px-3"
                    >
                      {user.isActive ? (
                        <>
                          <XCircle
                            size={16}
                            className="mr-1.5"
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
      </div>
    </DataTable>
  );
}

export default UsersTable;