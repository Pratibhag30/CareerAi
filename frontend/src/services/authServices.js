import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = (data) => axios.post(`${API_URL}/register`, data);
// export const login = (data) => axios.post(`${API_URL}/login`, data);

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  const { token, user } = response.data;

  // ✅ Save in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

export const getCurrentUser = (token) =>
  axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};
