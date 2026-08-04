import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../constants/sidebar";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const items = SIDEBAR_ITEMS[user.role] || [];

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 px-8 py-7">
        <h1 className="text-3xl font-bold tracking-tight text-blue-500">
          ClaimCorp
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Enterprise Expense Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-6">
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `
                }
              >
                <Icon size={22} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-slate-800 p-6">
        <p className="text-sm font-semibold text-white">
          {user?.name}
        </p>

        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
          {user?.role}
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;