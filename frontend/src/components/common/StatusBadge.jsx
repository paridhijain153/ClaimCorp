const styles = {
  DRAFT:
    "border-brand-200 bg-brand-50 text-brand-700",

  SUBMITTED:
    "border-amber-200 bg-amber-50 text-amber-800",

  APPROVED:
    "border-emerald-200 bg-emerald-50 text-emerald-800",

  REJECTED:
    "border-red-200 bg-red-50 text-red-800",

  REIMBURSED:
    "border-blue-200 bg-blue-50 text-blue-800",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
        styles[status] ?? "border-brand-200 bg-brand-50 text-brand-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;