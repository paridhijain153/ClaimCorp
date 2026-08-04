import categoriesRepository from "./categories.repository.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const categoriesService = {
  async createCategory(categoryData) {
    // Normalize input
    const normalizedData = {
      ...categoryData,
      name: categoryData.name.trim(),
    };

    // Check if category already exists
    const existingCategory =
      await categoriesRepository.findCategoryByName(
        normalizedData.name
      );

    if (existingCategory) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Category already exists."
      );
    }

    // Create category
    return categoriesRepository.createCategory(normalizedData);
  },
  async getAllCategories() {
  return categoriesRepository.findAllCategories();
},
async updateCategoryStatus(
  categoryId,
  isActive
) {
  const category =
    await categoriesRepository.findCategoryById(
      categoryId
    );

  if (!category) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Category not found."
    );
  }

  return categoriesRepository.updateCategory(
    categoryId,
    {
      isActive,
    }
  );
},
};

export default categoriesService;