import api from "./api";

export const getPendingExpenses = async () => {
  const response = await api.get(
    "/manager/expenses"
  );

  return response.data.data;
};

export const getExpenseById = async (
  id
) => {
  const response = await api.get(
    `/manager/expenses/${id}`
  );

  return response.data.data;
};

export const approveExpense = async (
  id
) => {
  const response = await api.patch(
    `/manager/expenses/${id}/approve`
  );

  return response.data.data;
};

export const rejectExpense = async (
  id,
  managerComment
) => {
  const response = await api.patch(
    `/manager/expenses/${id}/reject`,
    {
      managerComment,
    }
  );

  return response.data.data;
};

export const getDashboardStats =
  async () => {
    const response =
      await api.get(
        "/manager/dashboard"
      );

    return response.data.data;
  };

export const getCategoryAnalytics =
  async () => {
    const response =
      await api.get(
        "/manager/analytics/categories"
      );

    return response.data.data;
  };