import categoriesRepository from "./categories.repository.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const normalizedData = {
    ...categoryData,
        name: categoryData.name.trim().toLowerCase(),
    };
const categoriesService = {
  async createCategory(categoryData) {
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
    const category =
      await categoriesRepository.createCategory(
        normalizedData
      );

    return category;
  },
};

export default categoriesService;