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
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-brand-900">
          Approval Metrics
        </h2>
        <p className="mt-1 text-sm text-brand-500">
          Review employee expenses and monitor operational approvals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        <StatCard
          title="Pending Approvals"
          subtitle="Awaiting review"
          value={stats.pendingExpenses}
        />

        <StatCard
          title="Approved Expenses"
          subtitle="Successfully cleared"
          value={stats.approvedExpenses}
        />

        <StatCard
          title="Rejected Expenses"
          subtitle="Returned to staff"
          value={stats.rejectedExpenses}
        />

        <StatCard
          title="Pending Amount"
          subtitle="Total pending value"
          value={`₹${Number(stats.pendingAmount || 0).toLocaleString()}`}
        />

        <StatCard
          title="Approved Amount"
          subtitle="Total cleared value"
          value={`₹${Number(stats.approvedAmount || 0).toLocaleString()}`}
        />
      </div>
    </div>
  );
}

export default ManagerDashboard;