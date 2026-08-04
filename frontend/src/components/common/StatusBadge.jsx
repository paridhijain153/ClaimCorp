const styles = {
  DRAFT:
    "border border-gray-200 bg-gray-50 text-gray-700",

  SUBMITTED:
    "border border-amber-200 bg-amber-50 text-amber-700",

  APPROVED:
    "border border-green-200 bg-green-50 text-green-700",

  REJECTED:
    "border border-red-200 bg-red-50 text-red-700",

  REIMBURSED:
    "border border-blue-200 bg-blue-50 text-blue-700",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-medium ${
        styles[status] ??
        "border border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;