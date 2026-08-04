import { useNavigate } from "react-router-dom";

import ExpenseForm from "../../components/forms/ExpenseForm";
import Card from "../../components/ui/Card";

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
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-brand-900">
          New Expense Claim
        </h2>
        <p className="mt-0.5 text-sm text-brand-500">
          Fill in the details below to submit a new expense reimbursement request.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <ExpenseForm
          onSubmit={handleCreateExpense}
        />
      </Card>
    </div>
  );
}

export default CreateExpensePage;