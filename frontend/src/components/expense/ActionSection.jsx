import { useNavigate } from "react-router-dom";

import {
  submitExpense,
} from "../../services/expense.service";

function ActionSection({
  expense,
  editing,
  setEditing,
}) {
  const navigate =
    useNavigate();

  async function handleSubmit() {
    try {
      await submitExpense(
        expense.id
      );

      navigate(
        "/employee/expenses"
      );
    } catch (error) {
      console.error(error);
    }
  }

  const hasReceipt =
    expense.receipts.length > 0;

  if (
    expense.status !== "DRAFT"
  ) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">

        <p className="text-lg font-medium">

          This expense is already{" "}

          <span className="font-bold">
            {expense.status}
          </span>

        </p>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex justify-end gap-4">

        <button
          onClick={() =>
            setEditing(!editing)
          }
          className="rounded-xl border px-6 py-3 hover:bg-slate-100"
        >
          {editing
            ? "Cancel"
            : "Edit"}
        </button>

        <button
          disabled={!hasReceipt}
          onClick={
            handleSubmit
          }
          className={`rounded-xl px-6 py-3 text-white transition ${
            hasReceipt
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-slate-400"
          }`}
        >
          Submit Expense
        </button>

      </div>

      {!hasReceipt && (
        <p className="mt-4 text-sm text-red-500">

          Upload at least one receipt before submitting this expense.

        </p>
      )}

    </div>
  );
}

export default ActionSection;