import axios from "axios";

// hardcoded baseURL to avoid :5000 issue
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH
export const registerUser = (payload) => API.post("/auth/register", payload);
export const loginUser = (payload) => API.post("/auth/login", payload);

// EMPLOYEES
export const getEmployees = () => API.get("/employees");
export const createEmployee = (payload) => API.post("/employees", payload);
export const updateEmployee = (id, payload) => API.put(`/employees/${id}`, payload);
export const removeEmployee = (id) => API.delete(`/employees/${id}`);
