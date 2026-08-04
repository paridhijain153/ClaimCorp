import { useNavigate } from "react-router-dom";

import ExpenseForm from "../../components/forms/ExpenseForm";

import { createExpense } from "../../services/expense.service";

function CreateExpensePage() {
  const navigate = useNavigate();

  async function handleCreateExpense(
    expenseData
  ) {
    try {
      await createExpense(expenseData);

      navigate("/employee/expenses");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Create Expense
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new expense request.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <ExpenseForm
          onSubmit={
            handleCreateExpense
          }
        />
      </div>

    </div>
  );
}

export default CreateExpensePage;