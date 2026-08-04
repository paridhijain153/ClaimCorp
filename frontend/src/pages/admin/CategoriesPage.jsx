import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CategoriesTable from "../../components/tables/CategoriesTable";
import CreateCategoryModal from "../../components/common/CreateCategoryModal";
import Button from "../../components/ui/Button";

import {
  getCategories,
  createCategory,
  updateCategoryStatus,
} from "../../services/category.service";

function CategoriesPage() {
  // ==========================
  // State
  // ==========================

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const data = await getCategories();
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
      await createCategory(categoryData);
      setIsModalOpen(false);
      await loadCategories();
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // Activate / Deactivate
  // ==========================

  async function handleToggleStatus(
    category
  ) {
    try {
      await updateCategoryStatus(
        category.id,
        !category.isActive
      );
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading categories...
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
            Category Management
          </h2>
          <p className="mt-0.5 text-sm text-brand-500">
            Configure available classification tags for expense creation.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Plus size={16} />
          Create Category
        </Button>
      </div>

      {/* Categories Table Component */}
      <CategoriesTable
        categories={categories}
        onToggleStatus={handleToggleStatus}
      />

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCategory={handleCreateCategory}
      />
    </div>
  );
}

export default CategoriesPage;