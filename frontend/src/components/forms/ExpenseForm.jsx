import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { expenseSchema } from "../../pages/employee/expenseSchema";
import { getCategories } from "../../services/category.service";

function ExpenseForm({
  onSubmit,
  defaultValues,
}) {
  const [categories, setCategories] =
    useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),

    defaultValues:
      defaultValues || {
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
      const data =
        await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-lg border px-4 py-2"
          placeholder="Expense title"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.title?.message}
        </p>
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          {...register("categoryId")}
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <p className="mt-1 text-sm text-red-500">
          {errors.categoryId?.message}
        </p>
      </div>

      {/* Amount */}

      <div>
        <label className="mb-2 block font-medium">
          Amount
        </label>

        <input
          type="number"
          step="0.01"
          {...register("amount", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.amount?.message}
        </p>
      </div>

      {/* Tax */}

      <div>
        <label className="mb-2 block font-medium">
          Tax
        </label>

        <input
          type="number"
          step="0.01"
          {...register("tax", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.tax?.message}
        </p>
      </div>

      {/* Expense Date */}

      <div>
        <label className="mb-2 block font-medium">
          Expense Date
        </label>

        <input
          type="date"
          {...register("expenseDate")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.expenseDate?.message}
        </p>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
      >
        Save Draft
      </button>
    </form>
  );
}

export default ExpenseForm;