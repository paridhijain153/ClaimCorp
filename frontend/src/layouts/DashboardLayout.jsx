import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-200 selection:text-slate-900">
      <div className="flex min-h-screen flex-row">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto overflow-x-hidden focus:outline-none">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;