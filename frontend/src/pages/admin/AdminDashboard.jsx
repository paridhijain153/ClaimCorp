import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserCog,
  FolderOpen,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import Card from "../../components/ui/Card";
import StatCard from "../../components/common/StatCard";

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
    <div className="space-y-10">
      {/* User Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            User Overview
          </h2>
          <p className="mt-1 text-sm text-brand-500">
            Overview of registered users and organizational roles.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
          <StatCard
            title="Total Users"
            subtitle="All registered users"
            value={dashboard.totalUsers}
            icon={Users}
            color="text-brand-900"
          />

          <StatCard
            title="Managers"
            subtitle="Organization managers"
            value={dashboard.totalManagers}
            icon={UserCog}
            color="text-brand-900"
          />

          <StatCard
            title="Employees"
            subtitle="Registered employees"
            value={dashboard.totalEmployees}
            icon={UserCheck}
            color="text-brand-900"
          />

          <StatCard
            title="Categories"
            subtitle="Expense categories"
            value={dashboard.totalCategories}
            icon={FolderOpen}
            color="text-brand-900"
          />
        </div>
      </section>

      {/* Expense Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            Expense Overview
          </h2>
          <p className="mt-1 text-sm text-brand-500">
            Current status of expense approvals across the organization.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
          <StatCard
            title="Pending Approvals"
            subtitle="Awaiting manager review"
            value={dashboard.pendingExpenses}
            icon={Clock3}
            color="text-amber-600"
          />

          <StatCard
            title="Approved Expenses"
            subtitle="Successfully approved"
            value={dashboard.approvedExpenses}
            icon={CheckCircle2}
            color="text-emerald-600"
          />

          <StatCard
            title="Rejected Expenses"
            subtitle="Returned to employees"
            value={dashboard.rejectedExpenses}
            icon={XCircle}
            color="text-red-600"
          />
        </div>
      </section>

      {/* Financial Summary */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            Financial Summary
          </h2>
          <p className="mt-1 text-sm text-brand-500">
            Total approved reimbursement amount across the organization.
          </p>
        </div>

        <Card>
          <div className="flex flex-col justify-center py-2">
            <p className="text-sm font-medium text-brand-500">
              Total Approved Amount
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight tabular-nums text-brand-900 sm:text-4xl">
              ₹{Number(dashboard.totalApprovedAmount).toLocaleString()}
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-brand-500">
              Total reimbursement approved across all employees.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default AdminDashboard;