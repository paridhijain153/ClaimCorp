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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading pending approvals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Header Bar */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-brand-900">
          Pending Approvals Queue
        </h2>
        <p className="mt-0.5 text-sm text-brand-500">
          Review and action submitted expense claims awaiting your authorization.
        </p>
      </div>

      {/* Pending Expenses Table Component */}
      <PendingExpensesTable
        expenses={expenses}
      />
    </div>
  );
}

export default PendingExpensesPage;