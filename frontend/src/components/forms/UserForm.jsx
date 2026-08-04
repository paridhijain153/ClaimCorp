import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    formState: { errors },
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
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <label className="mb-2 block font-medium">
          Name
        </label>

        <input
          {...register("name")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.name?.message}
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          {...register("email")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.email?.message}
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <input
          type="password"
          {...register("password")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.password?.message}
        </p>
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block font-medium">
          Role
        </label>

        <select
          {...register("role")}
          className="w-full rounded-lg border px-4 py-2"
        >
          <option value={ROLES.EMPLOYEE}>
            Employee
          </option>

          <option value={ROLES.MANAGER}>
            Manager
          </option>
        </select>
      </div>

      {/* Department */}
      <div>
        <label className="mb-2 block font-medium">
          Department
        </label>

        <input
          {...register("department")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.department?.message}
        </p>
      </div>

      {/* Designation */}
      <div>
        <label className="mb-2 block font-medium">
          Designation
        </label>

        <input
          {...register("designation")}
          className="w-full rounded-lg border px-4 py-2"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.designation?.message}
        </p>
      </div>

      {/* Manager Dropdown (Only for Employees) */}
      {selectedRole === ROLES.EMPLOYEE && (
        <div>
          <label className="mb-2 block font-medium">
            Manager
          </label>

          <select
            {...register("managerId")}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="">
              Select Manager
            </option>

            {managers?.map((manager) => (
              <option
                key={manager.id}
                value={manager.id}
              >
                {manager.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-sm text-red-500">
            {errors.managerId?.message}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Create User
      </button>
    </form>
  );
}

export default UserForm;