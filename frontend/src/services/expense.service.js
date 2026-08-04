import api from "./api";

export const createExpense = async (
  expenseData
) => {
  const response = await api.post(
    "/expenses",
    expenseData
  );

  return response.data.data;
};