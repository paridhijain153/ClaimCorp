import {
  CheckCircle,
  XCircle,
} from "lucide-react";

function UsersTable({
  users,
  onToggleStatus,
}) {
  return (
    <table className="min-w-full">

      <thead className="bg-slate-50">

        <tr>

          <th className="px-6 py-4 text-left">
            Name
          </th>

          <th className="px-6 py-4 text-left">
            Email
          </th>

          <th className="px-6 py-4 text-left">
            Role
          </th>

          <th className="px-6 py-4 text-left">
            Status
          </th>

          <th className="px-6 py-4 text-right">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {users.map((user) => (

          <tr
            key={user.id}
            className="border-t"
          >

            <td className="px-6 py-4">
              {user.name}
            </td>

            <td className="px-6 py-4">
              {user.email}
            </td>

            <td className="px-6 py-4">
              {user.role}
            </td>

            <td className="px-6 py-4">

              {user.isActive ? (

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Active
                </span>

              ) : (

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  Inactive
                </span>

              )}

            </td>

            <td className="px-6 py-4 text-right">

              <button
                onClick={() =>
                  onToggleStatus(user)
                }
                className="rounded-lg border px-3 py-2 hover:bg-slate-100"
              >

                {user.isActive ? (

                  <XCircle
                    size={18}
                  />

                ) : (

                  <CheckCircle
                    size={18}
                  />

                )}

              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default UsersTable;