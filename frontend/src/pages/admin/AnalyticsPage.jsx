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
      <div className="py-20 text-center">
        Loading analytics...
      </div>
    );
  }

  const pieColors = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
  ];

  return (
    <div className="space-y-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Organization-wide expense insights.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Users"
          value={dashboard.totalUsers}
          icon={Users}
          color="blue"
        />

        <StatCard
          title="Employees"
          value={dashboard.totalEmployees}
          icon={UserCheck}
          color="green"
        />

        <StatCard
          title="Managers"
          value={dashboard.totalManagers}
          icon={UserCog}
          color="purple"
        />

        <StatCard
          title="Approved Amount"
          value={`₹${Number(
            dashboard.totalApprovedAmount
          ).toLocaleString()}`}
          icon={Wallet}
          color="orange"
        />

      </div>

      {/* Monthly Trend */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold">
          Monthly Expense Trend
        </h2>

        <div style={{ height: 320 }}>

          <ResponsiveContainer>

            <LineChart data={monthly}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="totalAmount"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </Card>

      {/* Charts */}

      <div className="grid gap-8 xl:grid-cols-2">

        <Card>

          <h2 className="mb-6 text-xl font-semibold">
            Category Spending
          </h2>

          <div style={{ height: 320 }}>

            <ResponsiveContainer>

              <BarChart
                data={categories}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="category"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="totalAmount"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

        <Card>

          <h2 className="mb-6 text-xl font-semibold">
            Employee Spending
          </h2>

          <div style={{ height: 320 }}>

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={employees}
                  dataKey="totalAmount"
                  nameKey="employeeName"
                  outerRadius={100}
                  label
                >

                  {employees.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          pieColors[
                            index %
                              pieColors.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      {/* Top Employees */}

      <Card>

        <h2 className="mb-6 text-xl font-semibold">
          Top Employees
        </h2>

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Employee
              </th>

              <th className="px-6 py-4 text-left">
                Expenses
              </th>

              <th className="px-6 py-4 text-right">
                Total Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.map(
              (employee) => (
                <tr
                  key={
                    employee.employeeId
                  }
                  className="border-t"
                >

                  <td className="px-6 py-4">
                    {
                      employee.employeeName
                    }
                  </td>

                  <td className="px-6 py-4">
                    {
                      employee.expenseCount
                    }
                  </td>

                  <td className="px-6 py-4 text-right font-semibold">
                    ₹
                    {Number(
                      employee.totalAmount
                    ).toLocaleString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </Card>

    </div>
  );
}

export default AnalyticsPage;