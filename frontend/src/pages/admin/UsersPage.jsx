import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import UsersTable from "../../components/tables/UsersTable";
import CreateUserModal from "../../components/common/CreateUserModal";

import {
  getUsers,
  updateUserStatus,
  createUser,
} from "../../services/users.service";

function UsersPage() {
  // ==========================
  // State
  // ==========================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ==========================
  // Derived Data
  // ==========================

  const managers = users.filter(
    (user) =>
      user.role === "MANAGER" &&
      user.isActive
  );

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
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading users...
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="mt-2 text-slate-500">
            Manage employees and managers.
          </p>
        </div>

        <button
          onClick={() =>{
            console.log("Create User clicked");
            setIsModalOpen(true)
          }}

          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />

          Create User
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">
            All Users
          </h2>
        </div>

        <UsersTable
          users={users}
          onToggleStatus={
            handleToggleStatus
          }
        />
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onCreateUser={
          handleCreateUser
        }
        managers={managers}
      />
    </div>
  );
}

export default UsersPage;