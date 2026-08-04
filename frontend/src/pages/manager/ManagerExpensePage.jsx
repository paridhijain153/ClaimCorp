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
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="py-20 text-center">
        Expense not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

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