import {
  useEffect,
  useState,
} from "react";

import PendingExpensesTable from "../../components/tables/PendingExpensesTable";

import {
  getPendingExpenses,
} from "../../services/manager.service";

function PendingExpensesPage() {
  const [
    expenses,
    setExpenses,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const data =
        await getPendingExpenses();

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
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Pending Expenses
        </h1>

        <p className="mt-2 text-slate-500">
          Review submitted employee expenses.
        </p>

      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <PendingExpensesTable
          expenses={
            expenses
          }
        />

      </div>

    </div>
  );
}

export default PendingExpensesPage;