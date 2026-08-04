function ExpenseInfoCard({
  expense,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">

        Expense Information

      </h2>

      <div className="grid grid-cols-2 gap-6">

        <Info
          label="Title"
          value={expense.title}
        />

        <Info
          label="Category"
          value={
            expense.category.name
          }
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
            "-"
          }
        />

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>

    </div>
  );
}

export default ExpenseInfoCard;