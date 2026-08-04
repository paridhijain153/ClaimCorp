import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data.data;
};

export const createUser = async (userData) => {
  const response = await api.post(
    "/users",
    userData
  );

  return response.data.data;
};

export const updateUserStatus = async (
  id,
  isActive
) => {
  const response = await api.patch(
    `/users/${id}/status`,
    {
      isActive,
    }
  );

  return response.data.data;
};
export const resetUserPassword = async (
  id,
  newPassword
) => {
  const response = await api.patch(
    `/users/${id}/reset-password`,
    {
      newPassword,
    }
  );

  return response.data.data;
};