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
export const getMyExpenses = async () => {
  const response = await api.get("/expenses");

  return response.data.data;
};
export const getExpenseById = async (id) => {
  const response = await api.get(`/expenses/${id}`);

  return response.data.data;
};

export const updateExpense = async (
  id,
  expenseData
) => {
  const response = await api.patch(
    `/expenses/${id}`,
    expenseData
  );

  return response.data.data;
};

export const submitExpense = async (
  id
) => {
  const response = await api.patch(
    `/expenses/${id}/submit`
  );

  return response.data.data;
};
export const autofillExpense = async (
  id
) => {
  const response = await api.patch(
    `/expenses/${id}/autofill`
  );

  return response.data.data;
};