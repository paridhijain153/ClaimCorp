import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

import { loginSchema } from "./loginSchema";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../contexts/AuthContext";
import { ROLES } from "../../constants/roles";
import { ROUTES } from "../../constants/routes";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);

      login(result.accessToken, result.user);

      toast.success("Login successful!");

      switch (result.user.role) {
        case ROLES.ADMIN:
          navigate(ROUTES.ADMIN);
          break;

        case ROLES.MANAGER:
          navigate(ROUTES.MANAGER);
          break;

        case ROLES.EMPLOYEE:
          navigate(ROUTES.EMPLOYEE);
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md p-8 sm:p-10 shadow-soft">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-brand-900">
            ClaimCorp
          </h1>
          <p className="mt-1 text-sm text-brand-500">
            Enterprise Expense Management Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full justify-center"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;