import { useEffect, useState } from "react";

import {
  Users,
  UserCog,
  UserCheck,
  Wallet,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Card from "../../components/ui/Card";
import StatCard from "../../components/common/StatCard";

import {
  getDashboard,
  getMonthlyAnalytics,
  getCategoryAnalytics,
  getEmployeeAnalytics,
} from "../../services/analytics.service";

function AnalyticsPage() {
  const [dashboard, setDashboard] =
    useState(null);

  const [monthly, setMonthly] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const [
        dashboardData,
        monthlyData,
        categoryData,
        employeeData,
      ] = await Promise.all([
        getDashboard(),
        getMonthlyAnalytics(),
        getCategoryAnalytics(),
        getEmployeeAnalytics(),
      ]);

      setDashboard(dashboardData);
      setMonthly(monthlyData);
      setCategories(categoryData);
      setEmployees(employeeData);
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
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  const pieColors = [
    "#0f172a",
    "#334155",
    "#64748b",
    "#059669",
    "#d97706",
    "#dc2626",
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
        <StatCard
          title="Total Users"
          subtitle="Registered accounts"
          value={dashboard.totalUsers}
          icon={Users}
        />

        <StatCard
          title="Employees"
          subtitle="Active workforce"
          value={dashboard.totalEmployees}
          icon={UserCheck}
        />

        <StatCard
          title="Managers"
          subtitle="Reviewers & approvers"
          value={dashboard.totalManagers}
          icon={UserCog}
        />

        <StatCard
          title="Approved Sum"
          subtitle="Total cleared budget"
          value={`₹${Number(dashboard.totalApprovedAmount || 0).toLocaleString()}`}
          icon={Wallet}
        />
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-brand-900">
            Monthly Expense Trend
          </h2>
          <p className="text-xs text-brand-500">
            Reimbursement volume over the fiscal timeline
          </p>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  fontSize: "13px",
                }}
                formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
              />
              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="currentColor"
                className="text-brand-900"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "currentColor" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Category Spending */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-brand-900">
              Category Spending
            </h2>
            <p className="text-xs text-brand-500">
              Expenditure distribution across expense types
            </p>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" vertical={false} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
                />
                <Bar
                  dataKey="totalAmount"
                  fill="currentColor"
                  className="text-brand-900"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Employee Spending */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-brand-900">
              Employee Spending Share
            </h2>
            <p className="text-xs text-brand-500">
              Top claimants proportion of organization budget
            </p>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employees}
                  dataKey="totalAmount"
                  nameKey="employeeName"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  label={false}
                >
                  {employees.map((_, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Employees Table */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border p-6">
          <h2 className="text-base font-semibold text-brand-900">
            Top Claimants
          </h2>
          <p className="text-xs text-brand-500">
            Employees with highest total approved claims
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Employee
                </th>
                <th className="border-b border-border px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Claims Count
                </th>
                <th className="border-b border-border px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Total Approved Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.employeeId}
                  className="transition-colors hover:bg-brand-50"
                >
                  <td className="border-b border-border px-6 py-4 font-medium text-brand-900">
                    {employee.employeeName}
                  </td>
                  <td className="border-b border-border px-6 py-4 text-brand-600">
                    {employee.expenseCount}
                  </td>
                  <td className="border-b border-border px-6 py-4 text-right font-semibold tabular-nums text-brand-900">
                    ₹{Number(employee.totalAmount || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AnalyticsPage;