import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../constants/sidebar";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const items = SIDEBAR_ITEMS[user.role] || [];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex h-20 items-center px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm">
            C
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-[-0.03em] text-slate-900">
              Claim<span className="text-slate-500">Corp</span>
            </h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Navigation
        </p>

        <div className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 ${
                    isActive
                      ? "bg-slate-900 font-medium text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-700"
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

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {user?.name?.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              {user?.name}
            </p>
            <p className="truncate text-xs text-slate-500 capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;