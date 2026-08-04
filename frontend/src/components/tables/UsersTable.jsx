import {
  CheckCircle,
  XCircle,
  KeyRound,
} from "lucide-react";

import DataTable from "./DataTable";
import TableEmpty from "./TableEmpty";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function UsersTable({
  users,
  onToggleStatus,
  onResetPassword,
}) {
  return (
    <DataTable
      title="Users"
      description="Manage employees and managers."
    >
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Name
            </th>

            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Email
            </th>

            <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
              Role
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
          {users.length === 0 ? (
            <TableEmpty
              title="No users found"
              description="Create your first employee or manager."
            />
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="group transition-colors duration-200 hover:bg-brand-50"
              >
                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <p className="font-medium text-brand-900">
                    {user.name}
                  </p>
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4 text-brand-500">
                  {user.email}
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <span className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                    {user.role}
                  </span>
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <StatusBadge
                    status={
                      user.isActive
                        ? "APPROVED"
                        : "REJECTED"
                    }
                  />
                </td>

                <td className="whitespace-nowrap border-b border-border px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        onResetPassword(user)
                      }
                      className="!px-3 !py-1.5"
                    >
                      <KeyRound
                        size={16}
                        className="mr-1.5"
                      />
                      Reset
                    </Button>

                    <Button
                      variant={
                        user.isActive
                          ? "ghost-danger"
                          : "ghost"
                      }
                      onClick={() =>
                        onToggleStatus(user)
                      }
                      className="!px-3 !py-1.5"
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
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DataTable>
  );
}

export default UsersTable;