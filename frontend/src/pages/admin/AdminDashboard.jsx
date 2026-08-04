import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserCog,
  FolderOpen,
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldAlert,
} from "lucide-react";

import StatCard from "../../components/cards/StatCard";

import {
  getDashboard,
} from "../../services/analytics.service";

function AdminDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of the expense management system.
        </p>
      </div>

      {/* Users */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          icon={Users}
          color="blue"
        />

        <StatCard
          title="Managers"
          value={dashboard.totalManagers}
          icon={UserCog}
          color="purple"
        />

        <StatCard
          title="Employees"
          value={dashboard.totalEmployees}
          icon={UserCheck}
          color="green"
        />

        <StatCard
          title="Categories"
          value={dashboard.totalCategories}
          icon={FolderOpen}
          color="orange"
        />

      </div>

      {/* Expenses */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Pending"
          value={dashboard.pendingExpenses}
          icon={Clock3}
          color="orange"
        />

        <StatCard
          title="Approved"
          value={dashboard.approvedExpenses}
          icon={CheckCircle2}
          color="green"
        />

        <StatCard
          title="Rejected"
          value={dashboard.rejectedExpenses}
          icon={XCircle}
          color="red"
        />

        <StatCard
          title="Fraud Alerts"
          value={dashboard.fraudAlerts}
          icon={ShieldAlert}
          color="purple"
        />

      </div>

      {/* Approved Amount */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Total Approved Amount
        </p>

        <h2 className="mt-4 text-5xl font-bold text-green-600">
          ₹
          {Number(
            dashboard.totalApprovedAmount
          ).toLocaleString()}
        </h2>

      </div>

    </div>
  );
}

export default AdminDashboard;