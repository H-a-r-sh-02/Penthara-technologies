import axios from "axios";

// hardcoded baseURL to avoid :5000 issue
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH APIS
export const registerUser = (payload) => API.post("/api/auth/register", payload);
export const loginUser = (payload) => API.post("/api/auth/login", payload);

// EMPLOYEES APIS
export const getEmployees = () => API.get("api/employees");
export const createEmployee = (payload) => API.post("api/employees", payload);
export const updateEmployee = (id, payload) => API.put(`api/employees/${id}`, payload);
export const removeEmployee = (id) => API.delete(`api/employees/${id}`);
