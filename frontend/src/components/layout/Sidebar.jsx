import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import { SIDEBAR_ITEMS } from "../../constants/sidebar";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar({
  isOpen,
  onClose,
}) {
  const { user } = useAuth();

  const items =
    SIDEBAR_ITEMS[user.role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          border-r
          border-border
          bg-surface
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:sticky
          lg:top-0
          lg:flex
          lg:translate-x-0
        `}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-sm font-bold text-surface shadow-soft">
              C
            </div>

            <h1 className="text-base font-semibold tracking-tight text-brand-900">
              Claim
              <span className="text-brand-500">
                Corp
              </span>
            </h1>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-brand-50 lg:hidden"
          >
            <X size={20} />
          </button>
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
                  onClick={onClose}
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
                        strokeWidth={
                          isActive ? 2.5 : 2
                        }
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-brand-900"
                            : "text-brand-400 group-hover:text-brand-600"
                        }`}
                      />

                      <span className="truncate">
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-100 text-sm font-semibold text-brand-900">
              {user?.name?.charAt(0) || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-900">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs capitalize text-brand-500">
                {user?.role?.toLowerCase() ||
                  "Role"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;