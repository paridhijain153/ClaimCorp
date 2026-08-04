import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categorySchema } from "../../pages/admin/categorySchema";

function CategoryForm({
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  function handleFormSubmit(data) {
    onSubmit(data);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Category Name
        </label>

        <input
          {...register("name")}
          placeholder="Enter category name"
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.name?.message}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Create Category
      </button>
    </form>
  );
}

export default CategoryForm;