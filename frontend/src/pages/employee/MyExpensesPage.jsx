import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ExpensesTable from "../../components/tables/ExpensesTable";
import { getMyExpenses } from "../../services/expense.service";

function MyExpensesPage() {
  const navigate = useNavigate();

  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const data =
        await getMyExpenses();

      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading expenses...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            My Expenses
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage your expenses.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/employee/create-expense")
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          New Expense
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-lg font-semibold">
            All Expenses
          </h2>

        </div>

        <ExpensesTable
          expenses={expenses}
        />

      </div>

    </div>
  );
}

export default MyExpensesPage;