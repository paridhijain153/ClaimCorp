import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CategoriesTable from "../../components/tables/CategoriesTable";
import CreateCategoryModal from "../../components/common/CreateCategoryModal";

import {
  getCategories,
  createCategory,
} from "../../services/category.service";

function CategoriesPage() {
  // ==========================
  // State
  // ==========================

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    loadCategories();
  }, []);

  // ==========================
  // Fetch Categories
  // ==========================

  async function loadCategories() {
    try {
      const data =
        await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Create Category
  // ==========================

  async function handleCreateCategory(
    categoryData
  ) {
    try {
      await createCategory(
        categoryData
      );

      setIsModalOpen(false);

      await loadCategories();
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
        Loading categories...
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
            Categories
          </h1>

          <p className="mt-2 text-slate-500">
            Manage expense categories.
          </p>
        </div>

        <button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">
            All Categories
          </h2>
        </div>

        <CategoriesTable
          categories={categories}
        />
      </div>

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onCreateCategory={
          handleCreateCategory
        }
      />
    </div>
  );
}

export default CategoriesPage;