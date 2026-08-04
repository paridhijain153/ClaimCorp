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
              allowedRoles={[
                ROLES.MANAGER,
              ]}
            >
              <ManagerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <RoleRoute
              allowedRoles={[
                ROLES.EMPLOYEE,
              ]}
            >
              <EmployeeDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

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