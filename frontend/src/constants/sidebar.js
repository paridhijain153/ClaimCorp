import {
  LayoutDashboard,
  Receipt,
  PlusCircle,
  ClipboardCheck,
  BarChart3,
  Users,
  FolderOpen,
} from "lucide-react";

import { ROLES } from "./roles";

export const SIDEBAR_ITEMS = {
  [ROLES.EMPLOYEE]: [
    {
      label: "Dashboard",
      path: "/employee",
      icon: LayoutDashboard,
    },
    {
      label: "My Expenses",
      path: "/employee/expenses",
      icon: Receipt,
    },
    {
      label: "New Expense",
      path: "/employee/create-expense",
      icon: PlusCircle,
    },
  ],

  [ROLES.MANAGER]: [
    {
      label: "Dashboard",
      path: "/manager",
      icon: LayoutDashboard,
    },
    {
      label: "Approvals",
      path: "/manager/expenses",
      icon: ClipboardCheck,
    },
    {
      label: "Analytics",
      path: "/manager/analytics",
      icon: BarChart3,
    },
  ],

  [ROLES.ADMIN]: [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: FolderOpen,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
  ],
};