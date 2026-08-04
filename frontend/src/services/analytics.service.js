import api from "./api";

export const getDashboard = async () => {
  const response = await api.get("/analytics/dashboard");
  return response.data.data;
};

export const getMonthlyAnalytics = async () => {
  const response = await api.get("/analytics/monthly");
  return response.data.data;
};

export const getCategoryAnalytics = async () => {
  const response = await api.get("/analytics/categories");
  return response.data.data;
};

export const getEmployeeAnalytics = async () => {
  const response = await api.get("/analytics/employees");
  return response.data.data;
};