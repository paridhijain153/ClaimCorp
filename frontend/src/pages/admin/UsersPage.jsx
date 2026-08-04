import { useEffect, useState } from "react";
import {
  Plus,
  Search,
} from "lucide-react";

import UsersTable from "../../components/tables/UsersTable";
import CreateUserModal from "../../components/common/CreateUserModal";
import ResetPasswordModal from "../../components/common/ResetPasswordModal";
import Button from "../../components/ui/Button";

import toast from "react-hot-toast";

import {
  getUsers,
  updateUserStatus,
  createUser,
  resetUserPassword,
} from "../../services/users.service";

function UsersPage() {
  // ==========================
  // State
  // ==========================

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    isResetModalOpen,
    setIsResetModalOpen,
  ] = useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("ALL");

  const [sortBy, setSortBy] =
    useState("NAME_ASC");

  // ==========================
  // Derived Data
  // ==========================

  const managers = users.filter(
    (user) =>
      user.role === "MANAGER" &&
      user.isActive
  );

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE"
          ? user.isActive
          : !user.isActive);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "NAME_ASC":
          return a.name.localeCompare(
            b.name
          );

        case "NAME_DESC":
          return b.name.localeCompare(
            a.name
          );

        default:
          return 0;
      }
    });

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    loadUsers();
  }, []);

  // ==========================
  // Fetch Users
  // ==========================

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Create User
  // ==========================

  async function handleCreateUser(
    userData
  ) {
    try {
      await createUser(userData);
      setIsModalOpen(false);
      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // Activate / Deactivate
  // ==========================

  async function handleToggleStatus(
    user
  ) {
    try {
      await updateUserStatus(
        user.id,
        !user.isActive
      );

      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // Reset Password
  // ==========================

  async function handleResetPassword(
    passwordData
  ) {
    try {
      await resetUserPassword(
        selectedUser.id,
        passwordData
      );

      toast.success(
        "Password reset successfully."
      );

      setIsResetModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password."
      );
    }
  }

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }
    // ==========================
  // UI
  // ==========================

  return (
    <div className="space-y-6">
      {/* Action Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-brand-900">
            Directory Management
          </h2>

          <p className="mt-0.5 text-sm text-brand-500">
            Showing{" "}
            <span className="font-medium text-brand-900">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-brand-900">
              {users.length}
            </span>{" "}
            registered users
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Create User
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[260px] flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400"
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-4 text-sm text-brand-900 placeholder:text-brand-400 shadow-soft transition-all duration-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-brand-900 shadow-soft focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
        >
          <option value="NAME_ASC">Name A-Z</option>
          <option value="NAME_DESC">Name Z-A</option>
        </select>
      </div>

      {/* Users Table */}
      <UsersTable
        users={filteredUsers}
        onToggleStatus={handleToggleStatus}
        onResetPassword={(user) => {
          setSelectedUser(user);
          setIsResetModalOpen(true);
        }}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateUser={handleCreateUser}
        managers={managers}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        user={selectedUser}
        onClose={() => {
          setIsResetModalOpen(false);
          setSelectedUser(null);
        }}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}

export default UsersPage;