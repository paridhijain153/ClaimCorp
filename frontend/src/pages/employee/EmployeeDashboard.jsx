import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Clock3,
  CheckCircle2,
  IndianRupee,
  Plus,
  ArrowRight,
} from "lucide-react";

import StatCard from "../../components/common/StatCard";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/common/StatusBadge";

import { getMyExpenses } from "../../services/expense.service";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const data = await getMyExpenses();
      setExpenses(data);
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

  const draftCount = expenses.filter(
    (expense) => expense.status === "DRAFT"
  ).length;

  const submittedCount = expenses.filter(
    (expense) => expense.status === "SUBMITTED"
  ).length;

  const approvedCount = expenses.filter(
    (expense) => expense.status === "APPROVED"
  ).length;

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.totalAmount || 0),
    0
  );

  const recentExpenses = [...expenses].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
        <StatCard
          title="Draft Claims"
          subtitle="Unsubmitted reports"
          value={draftCount}
          icon={FileText}
        />

        <StatCard
          title="Submitted"
          subtitle="Pending review"
          value={submittedCount}
          icon={Clock3}
        />

        <StatCard
          title="Approved"
          subtitle="Successfully cleared"
          value={approvedCount}
          icon={CheckCircle2}
        />

        <StatCard
          title="Total Claimed"
          subtitle="Overall sum value"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={IndianRupee}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Expenses */}
        <Card className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-brand-900">
                Recent Expenses
              </h2>
              <p className="text-xs text-brand-500">
                Your latest expense claim submissions
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => navigate("/employee/expenses")}
              className="text-xs font-medium text-brand-600 hover:text-brand-900"
            >
              View All
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </div>

          {recentExpenses.length === 0 ? (
            <div className="py-12 text-center text-sm text-brand-500">
              No expenses created yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-brand-50/50"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="truncate font-medium text-brand-900">
                      {expense.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge status={expense.status} />
                      <span className="text-xs text-brand-400">
                        {expense.expenseNumber}
                      </span>
                    </div>
                  </div>

                  <p className="font-semibold tabular-nums text-brand-900">
                    ₹{Number(expense.totalAmount || 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="mb-4 text-base font-semibold text-brand-900">
            Quick Actions
          </h2>
          <p className="mb-6 text-xs text-brand-500">
            Perform common tasks quickly
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => navigate("/employee/create-expense")}
              className="w-full justify-center gap-2"
            >
              <Plus size={16} />
              Create Expense
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/employee/expenses")}
              className="w-full justify-center"
            >
              My Expenses
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeDashboard;