import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] ?? "ClaimCorp";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleLogout() {
    logout();
    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-[-0.03em] text-slate-900">
            {title}
          </h1>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {today}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1"
        >
          <LogOut size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;