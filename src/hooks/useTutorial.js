import { useState } from "react";
import { del, get, post, put } from "../api/apiClient";

const useTutorial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ CREATE
  const createTutorial = async (data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await post("tutorial/create", data);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET ALL
  const getTutorials = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await get("tutorial/all");
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE
  const updateTutorial = async (id, data) => {
    setError(null);
    setLoading(true);
    try {
      const response = await put(`tutorial/update/${id}`, data);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteTutorial = async (id) => {
    setError(null);
    setLoading(true);
    try {
      const response = await del(`tutorial/delete/${id}`);
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
    createTutorial,
    getTutorials,
    updateTutorial,
    deleteTutorial,
  };
};

export default useTutorial;