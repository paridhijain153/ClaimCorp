import { LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {today}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200">
          <Bell
            size={20}
            className="text-slate-600"
          />
        </button>

        {/* User */}
        <div className="text-right">
          <p className="font-semibold text-slate-900">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;