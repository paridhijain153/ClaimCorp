import api from "./api";

export const uploadReceipt = async (
  expenseId,
  file
) => {
  const formData = new FormData();

  formData.append(
    "receipt",
    file
  );

  const response = await api.post(
    `/receipts/expenses/${expenseId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.data;
};