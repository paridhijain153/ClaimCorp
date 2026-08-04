import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Card from "../ui/Card";

import {
  approveExpense,
  rejectExpense,
} from "../../services/manager.service";

function ManagerActionSection({
  expense,
}) {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [loadingAction, setLoadingAction] = useState(null);

  async function handleApprove() {
    try {
      setLoadingAction("APPROVE");
      await approveExpense(expense.id);
      navigate("/manager/expenses");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleReject() {
    try {
      setLoadingAction("REJECT");
      await rejectExpense(
        expense.id,
        comment
      );
      navigate("/manager/expenses");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  }

  if (expense.status !== "SUBMITTED") {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm font-medium text-brand-700">
          This expense has already been{" "}
          <span className="font-semibold uppercase tracking-wider text-brand-900">
            {expense.status}
          </span>
          .
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold text-brand-900">
        Manager Authorization Review
      </h3>

      <div className="space-y-3">
        <label className="block text-xs font-medium text-brand-500">
          Review Feedback / Rejection Reason (Required if rejecting)
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Provide context or instructions for the employee..."
          className="w-full rounded-lg border border-border bg-surface p-3 text-sm text-brand-900 placeholder:text-brand-400 shadow-soft transition-all duration-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="danger"
          loading={loadingAction === "REJECT"}
          onClick={handleReject}
        >
          Reject Claim
        </Button>

        <Button
          variant="primary"
          loading={loadingAction === "APPROVE"}
          onClick={handleApprove}
        >
          Approve Claim
        </Button>
      </div>
    </Card>
  );
}

export default ManagerActionSection;