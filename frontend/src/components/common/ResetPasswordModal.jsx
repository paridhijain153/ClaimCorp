import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

function ResetPasswordModal({
  isOpen,
  onClose,
  onResetPassword,
  user,
}) {
  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
  }, [isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newPassword.trim()) {
      return toast.error(
        "Password is required."
      );
    }

    if (newPassword.length < 8) {
      return toast.error(
        "Password must be at least 8 characters long."
      );
    }

    if (
      newPassword !== confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      await onResetPassword(
        newPassword
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Password"
      description="Assign a new password for the selected user."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="rounded-lg border border-border bg-brand-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
            User
          </p>

          <p className="mt-1 text-base font-semibold text-brand-900">
            {user?.name}
          </p>

          <p className="text-sm text-brand-500">
            {user?.email}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-brand-700">
            New Password
          </label>

          <p className="mb-2 text-xs text-brand-500">
            Password must contain at least
            8 characters.
          </p>

          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            placeholder="Enter new password"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-brand-700">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ResetPasswordModal;