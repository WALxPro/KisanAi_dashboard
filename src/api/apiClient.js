import axios from "axios";

// const baseUrl = import.meta.env.VITE_API_URL;
const baseUrl = "http://127.0.0.1:8000";
if (!baseUrl) throw new Error("VITE_API_URL not defined!");

// Common error handler
const handleError = (error) => error.response?.data || { message: error.message };

// GET request
export const get = async (endpoint, params) => {
  try {
    const res = await axios.get(`${baseUrl}/${endpoint}`, { params });
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// POST request
export const post = async (endpoint, body, config = {}) => {
  try {
    const res = await axios.post(
      `${baseUrl}/${endpoint}`,
      body,
      { headers: { "Content-Type": "application/json", ...(config.headers || {}) }, ...config }
    );
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PUT request
export const put = async (endpoint, body, config = {}) => {
  try {
    const res = await axios.put(`${baseUrl}/${endpoint}`, body, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE request
export const del = async (endpoint, config = {}) => {
  try {
    const res = await axios.delete(`${baseUrl}/${endpoint}`, config);
    return res.data;
  } catch (error) {
    throw handleError(error);
  }
};