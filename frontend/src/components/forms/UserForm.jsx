import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { userSchema } from "../../pages/admin/userSchema";
import { ROLES } from "../../constants/roles";

function UserForm({
  onSubmit,
  managers,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: ROLES.EMPLOYEE,
    },
  });

  const selectedRole = watch("role");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Full Name"
        placeholder="e.g., Jane Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="jane.doe@company.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Set account password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-brand-700">
          Role
        </label>
        <select
          {...register("role")}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        >
          <option value={ROLES.EMPLOYEE}>Employee</option>
          <option value={ROLES.MANAGER}>Manager</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Department"
          placeholder="e.g., Engineering"
          error={errors.department?.message}
          {...register("department")}
        />

        <Input
          label="Designation"
          placeholder="e.g., Software Engineer"
          error={errors.designation?.message}
          {...register("designation")}
        />
      </div>

      {selectedRole === ROLES.EMPLOYEE && (
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-brand-700">
            Assigned Manager
          </label>
          <select
            {...register("managerId")}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
          >
            <option value="">Select approving manager</option>
            {managers?.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          {errors.managerId?.message && (
            <p className="text-xs font-medium text-red-600">
              {errors.managerId.message}
            </p>
          )}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          className="w-full justify-center"
        >
          Create User Account
        </Button>
      </div>
    </form>
  );
}

export default UserForm;