import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getExpenseById,
} from "../../services/manager.service";

import ExpenseHeader from "../../components/expense/ExpenseHeader";
import ExpenseInfoCard from "../../components/expense/ExpenseInfoCard";
import FinancialSummaryCard from "../../components/expense/FinancialSummaryCard";
import ReceiptSection from "../../components/expense/ReceiptSection";
import ManagerActionSection from "../../components/expense/ManagerActionSection";

function ManagerExpensePage() {
  const { id } = useParams();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpense();
  }, [id]);

  async function loadExpense() {
    try {
      const data = await getExpenseById(id);
      setExpense(data);
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
            Loading expense review...
          </p>
        </div>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-base font-semibold text-brand-900">
            Expense not found
          </p>
          <p className="mt-1 text-sm text-brand-500">
            The requested expense claim could not be located for review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ExpenseHeader expense={expense} />

      <ExpenseInfoCard expense={expense} />

      <FinancialSummaryCard expense={expense} />

      <ReceiptSection 
        expense={expense}
        readOnly={true}
      />

      <ManagerActionSection
        expense={expense}
      />
    </div>
  );
}

export default ManagerExpensePage;