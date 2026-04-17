import { useState } from "react";
import { del, get, post, put } from "../api/apiClient";

const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CreateBlog = async (data) => {
    console.log(data);
    setError(null);
    setLoading(true);
    try {
      const response = await post("blogs/create", data);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBlogs = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await get("blogs/all");
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id, data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await put(`blogs/update/${id}`, data);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const response = await del(`blogs/delete/${id}`);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    CreateBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogs;