import Card from "../ui/Card";

function ExpenseInfoCard({
  expense,
}) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-base font-semibold text-brand-900">
        Expense Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Info
          label="Title"
          value={expense.title}
        />

        <Info
          label="Category"
          value={expense.category.name}
        />

        <Info
          label="Expense Date"
          value={new Date(
            expense.expenseDate
          ).toLocaleDateString()}
        />

        <Info
          label="Description"
          value={
            expense.description ||
            "No description provided."
          }
        />
      </div>
    </Card>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-medium text-brand-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-brand-900">
        {value}
      </p>
    </div>
  );
}

export default ExpenseInfoCard;