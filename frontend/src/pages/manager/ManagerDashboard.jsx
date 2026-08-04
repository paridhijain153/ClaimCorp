import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../../services/manager.service";

import StatCard from "../../components/common/StatCard";

function ManagerDashboard() {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Operations
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Manager Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review employee expenses and monitor approvals.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-5">
        <StatCard
          title="Pending Approvals"
          value={stats.pendingExpenses}
          color="text-amber-600"
          className="border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        />

        <StatCard
          title="Approved"
          value={stats.approvedExpenses}
          color="text-emerald-600"
          className="border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        />

        <StatCard
          title="Rejected"
          value={stats.rejectedExpenses}
          color="text-rose-600"
          className="border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        />

        <StatCard
          title="Pending Amount"
          value={`₹${stats.pendingAmount}`}
          color="text-blue-600"
          className="border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        />

        <StatCard
          title="Approved Amount"
          value={`₹${stats.approvedAmount}`}
          color="text-emerald-600"
          className="border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        />
      </div>
    </div>
  );
}

export default ManagerDashboard;