function FinancialSummaryCard({
  expense,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">

        Financial Summary

      </h2>

      <div className="grid grid-cols-3 gap-6">

        <Card
          title="Amount"
          value={`₹${expense.amount}`}
        />

        <Card
          title="Tax"
          value={`₹${expense.tax}`}
        />

        <Card
          title="Total"
          value={`₹${expense.totalAmount}`}
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}

export default FinancialSummaryCard;