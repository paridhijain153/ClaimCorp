import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { expenseSchema } from "../../pages/employee/expenseSchema";
import { getCategories } from "../../services/category.service";

function ExpenseForm({
  onSubmit,
  defaultValues,
}) {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultValues || {
      title: "",
      categoryId: "",
      amount: 0,
      tax: 0,
      expenseDate: "",
      description: "",
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Expense Title"
        placeholder="e.g., Client dinner at Taj"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-brand-700">
          Category
        </label>
        <select
          {...register("categoryId")}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        >
          <option value="">Select expense category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId?.message && (
          <p className="text-xs font-medium text-red-600">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Amount (₹)"
          type="number"
          step="0.01"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />

        <Input
          label="Tax (₹)"
          type="number"
          step="0.01"
          placeholder="0.00"
          error={errors.tax?.message}
          {...register("tax", { valueAsNumber: true })}
        />
      </div>

      <Input
        label="Expense Date"
        type="date"
        error={errors.expenseDate?.message}
        {...register("expenseDate")}
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-brand-700">
          Description (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Add business justification or notes..."
          className="w-full rounded-lg border border-border bg-surface p-3 text-sm text-brand-900 placeholder:text-brand-400 shadow-soft transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-xs font-medium text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          className="w-full justify-center"
        >
          Save Expense Claim
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;