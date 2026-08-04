import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ExpensesTable from "../../components/tables/ExpensesTable";
import Button from "../../components/ui/Button";
import { getMyExpenses } from "../../services/expense.service";

function MyExpensesPage() {
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
            Loading expenses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            Expense Claims Management
          </h2>
          <p className="mt-0.5 text-sm text-brand-500">
            View, track, and manage all your submitted reimbursement reports.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/employee/create-expense")}
          className="gap-2"
        >
          <Plus size={16} />
          New Expense
        </Button>
      </div>

      {/* Expenses Table Component */}
      <ExpensesTable expenses={expenses} />
    </div>
  );
}

export default MyExpensesPage;