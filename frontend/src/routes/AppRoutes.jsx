import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "../constants/roles";
import DashboardLayout from "../layouts/DashboardLayout";
import UsersPage from "../pages/admin/UsersPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";
import CreateExpensePage from "../pages/employee/CreateExpensePage";
import MyExpensesPage from "../pages/employee/MyExpensesPage";
import ExpenseDetailsPage from "../pages/employee/ExpenseDetailsPage";
import PendingExpensesPage from "../pages/manager/PendingExpensePage";
import ManagerExpensePage from "../pages/manager/ManagerExpensePage";
import ManagerAnalyticsPage from "../pages/manager/ManagerAnalyticsPage";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <RoleRoute allowedRoles={[ROLES.ADMIN]}>
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  }
>
  <Route
    index
    element={<AdminDashboard />}
  />

  <Route
    path="users"
    element={<UsersPage />}
  />

  <Route
    path="categories"
    element={<CategoriesPage />}
  />

  <Route
    path="analytics"
    element={<AnalyticsPage />}
  />
</Route>
<Route
  path="/manager"
  element={
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[ROLES.MANAGER]}
      >
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  }
>
  <Route
    index
    element={<ManagerDashboard />}
  />

  <Route
    path="expenses"
    element={<PendingExpensesPage />}
  />

  <Route
    path="expenses/:id"
    element={<ManagerExpensePage />}
  />
  <Route
  path="analytics"
  element={<ManagerAnalyticsPage />}
/>
</Route>

<Route
  path="/employee"
  element={
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[ROLES.EMPLOYEE]}
      >
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  }
>
  <Route
    index
    element={<EmployeeDashboard />}
  />

  <Route
    path="create-expense"
    element={<CreateExpensePage />}
  />
  <Route
    path="expenses"
    element={<MyExpensesPage />}
  />
  <Route
    path="expenses/:id"
    element={<ExpenseDetailsPage />}
  />
</Route>

      <Route
        path="*"
        element={
          <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default AppRoutes;