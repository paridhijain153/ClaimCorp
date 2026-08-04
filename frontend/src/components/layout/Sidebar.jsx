import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../constants/sidebar";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const items = SIDEBAR_ITEMS[user.role] || [];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-sm font-bold text-surface shadow-soft">
            C
          </div>
          <h1 className="text-base font-semibold tracking-tight text-brand-900">
            Claim<span className="text-brand-500">Corp</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-brand-400">
          Navigation
        </p>

        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/20 ${
                    isActive
                      ? "bg-brand-100 font-medium text-brand-900"
                      : "text-brand-600 hover:bg-brand-50 hover:text-brand-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? "text-brand-900"
                          : "text-brand-400 group-hover:text-brand-600"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="mt-auto p-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-100 text-sm font-semibold text-brand-900">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-brand-900">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs capitalize text-brand-500">
              {user?.role?.toLowerCase() || "Role"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;