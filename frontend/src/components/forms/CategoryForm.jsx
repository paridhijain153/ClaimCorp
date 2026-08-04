import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { categorySchema } from "../../pages/admin/categorySchema";

function CategoryForm({
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleFormSubmit(data) {
    await onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      <Input
        label="Category Name"
        placeholder="e.g., Travel, Software, Office Supplies"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          className="w-full justify-center"
        >
          Create Category
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;