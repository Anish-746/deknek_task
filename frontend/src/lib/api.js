import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiRequest(path, options = {}) {
  try {
    const response = await axiosInstance({
      url: path,
      method: options.method || "GET",
      data: options.body,
      ...options,
    });

    return response.data || {};
  } catch (error) {
    if (error.response?.data) {
      throw new Error(
        error.response.data.message ||
          error.response.data.error ||
          "Request failed",
        { cause: error },
      );
    }
    throw error;
  }
}
