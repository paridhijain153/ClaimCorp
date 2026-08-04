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

function ExpenseDetailsPage() {
  const { id } = useParams();

  const [expense, setExpense] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  useEffect(() => {
    loadExpense();
  }, [id]);

  async function loadExpense() {
    try {
      const data =
        await getExpenseById(id);

      setExpense(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    expenseData
  ) {
    try {
      const updated =
        await updateExpense(
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
      <div className="py-20 text-center">
        Loading expense...
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

      <ExpenseHeader
        expense={expense}
      />

      {editing ? (
        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <ExpenseForm
            defaultValues={{
              title: expense.title,
              categoryId:
                expense.category.id,
              amount: Number(
                expense.amount
              ),
              tax: Number(
                expense.tax
              ),
              expenseDate:
                expense.expenseDate.split(
                  "T"
                )[0],
              description:
                expense.description,
            }}
            onSubmit={
              handleUpdate
            }
          />

        </div>
      ) : (
        <ExpenseInfoCard
          expense={expense}
        />
      )}

      <FinancialSummaryCard
        expense={expense}
      />

      {expense.managerComment && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-red-700">
            Manager Feedback
          </h2>

          <p className="text-slate-700">
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