import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  approveExpense,
  rejectExpense,
} from "../../services/manager.service";

function ManagerActionSection({
  expense,
}) {
  const navigate = useNavigate();

  const [comment, setComment] =
    useState("");

  async function handleApprove() {
    try {
      await approveExpense(expense.id);

      navigate("/manager/expenses");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleReject() {
    try {
      await rejectExpense(
        expense.id,
        comment
      );

      navigate("/manager/expenses");
    } catch (error) {
      console.error(error);
    }
  }

  if (
    expense.status !== "SUBMITTED"
  ) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">

        <p className="font-medium">

          This expense has already been{" "}
          {expense.status}.

        </p>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-semibold">
        Manager Decision
      </h2>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Add comment (required for rejection)"
        className="w-full rounded-lg border p-3"
      />

      <div className="mt-6 flex justify-end gap-4">

        <button
          onClick={handleReject}
          className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          Reject
        </button>

        <button
          onClick={handleApprove}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Approve
        </button>

      </div>

    </div>
  );
}

export default ManagerActionSection;