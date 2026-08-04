import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getExpenseById,
  updateExpense,
} from "../../services/expense.service";

import ExpenseHeader from "../../components/expense/ExpenseHeader";
import ExpenseInfoCard from "../../components/expense/ExpenseInfoCard";
import FinancialSummaryCard from "../../components/expense/FinancialSummaryCard";
import ReceiptSection from "../../components/expense/ReceiptSection";
import ActionSection from "../../components/expense/ActionSection";
import ExpenseForm from "../../components/forms/ExpenseForm";
import Card from "../../components/ui/Card";

function ExpenseDetailsPage() {
  const { id } = useParams();

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

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

  async function handleUpdate(expenseData) {
    try {
      const updated = await updateExpense(
        expense.id,
        expenseData
      );
      setExpense(updated);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading expense details...
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
            The requested expense claim could not be located.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <ExpenseHeader expense={expense} />

      {editing ? (
        <Card className="p-6 sm:p-8">
          <ExpenseForm
            defaultValues={{
              title: expense.title,
              categoryId: expense.category.id,
              amount: Number(expense.amount),
              tax: Number(expense.tax),
              expenseDate: expense.expenseDate.split("T")[0],
              description: expense.description,
            }}
            onSubmit={handleUpdate}
          />
        </Card>
      ) : (
        <ExpenseInfoCard expense={expense} />
      )}

      <FinancialSummaryCard expense={expense} />

      {expense.managerComment && (
        <div className="rounded-xl border border-red-200 bg-red-50/60 p-6 shadow-soft">
          <h3 className="text-sm font-semibold text-red-900">
            Manager Feedback / Rejection Reason
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-red-700">
            {expense.managerComment}
          </p>
        </div>
      )}

      <ReceiptSection
        expense={expense}
        refreshExpense={loadExpense}
      />

      <ActionSection
        expense={expense}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}

export default ExpenseDetailsPage;