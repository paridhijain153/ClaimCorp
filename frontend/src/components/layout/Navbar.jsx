import {
  LogOut,
  Menu,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const PAGE_TITLES = {
  "/admin": "Admin Dashboard",
  "/admin/users": "User Management",
  "/admin/categories": "Expense Categories",
  "/admin/analytics": "Analytics",

  "/employee": "Employee Dashboard",
  "/employee/create-expense": "Create Expense",
  "/employee/expenses": "My Expenses",

  "/manager": "Manager Dashboard",
  "/manager/expenses": "Pending Approvals",
  "/manager/analytics": "Analytics",
};

function Navbar({
  onMenuClick,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const title =
    PAGE_TITLES[location.pathname] ??
    "ClaimCorp";

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition-colors hover:bg-brand-50 lg:hidden"
          >
            <Menu
              size={22}
              strokeWidth={2}
            />
          </button>

          {/* Title */}
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-brand-900">
              {title}
            </h1>

            <p className="mt-0.5 text-xs text-brand-500">
              {today}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900/20"
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="transition-colors group-hover:text-brand-900"
          />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;