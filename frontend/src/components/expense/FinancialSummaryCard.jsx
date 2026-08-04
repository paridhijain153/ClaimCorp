import Card from "../ui/Card";

function FinancialSummaryCard({
  expense,
}) {
  const amount = Number(expense.amount || 0);
  const tax = Number(expense.tax || 0);
  const total = Number(expense.totalAmount || amount + tax);

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-base font-semibold text-brand-900">
        Financial Breakdown
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryItem
          title="Subtotal Amount"
          value={`₹${amount.toLocaleString()}`}
        />

        <SummaryItem
          title="Tax Included"
          value={`₹${tax.toLocaleString()}`}
        />

        <SummaryItem
          title="Total Claim"
          value={`₹${total.toLocaleString()}`}
          highlight
        />
      </div>
    </Card>
  );
}

function SummaryItem({
  title,
  value,
  highlight = false,
}) {
  return (
    <div className={`rounded-xl border border-border p-4 transition-colors ${highlight ? 'bg-brand-50/50 border-brand-200' : 'bg-surface'}`}>
      <p className="text-xs font-medium text-brand-500">
        {title}
      </p>

      <p className={`mt-2 text-xl font-bold tracking-tight tabular-nums ${highlight ? 'text-brand-900' : 'text-brand-800'}`}>
        {value}
      </p>
    </div>
  );
}

export default FinancialSummaryCard;