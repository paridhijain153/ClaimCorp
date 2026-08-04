import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Card from "../ui/Card";

import {
  submitExpense,
} from "../../services/expense.service";

function ActionSection({
  expense,
  editing,
  setEditing,
}) {
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      await submitExpense(expense.id);
      navigate("/employee/expenses");
    } catch (error) {
      console.error(error);
    }
  }

  const hasReceipt = expense.receipts.length > 0;

  if (expense.status !== "DRAFT") {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm font-medium text-brand-700">
          This expense claim is currently{" "}
          <span className="font-semibold uppercase tracking-wider text-brand-900">
            {expense.status}
          </span>
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {!hasReceipt ? (
            <p className="text-xs font-medium text-red-600">
              * Upload at least one receipt attachment before final submission.
            </p>
          ) : (
            <p className="text-xs font-medium text-emerald-600">
              ✓ Ready for final review and submission.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel Editing" : "Edit Claim"}
          </Button>

          <Button
            variant="primary"
            disabled={!hasReceipt}
            onClick={handleSubmit}
          >
            Submit Expense
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ActionSection;