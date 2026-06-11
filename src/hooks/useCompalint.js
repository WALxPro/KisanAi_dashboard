import { useState } from "react";
import { del, get, post, put } from "../api/apiClient";

const useComplaints = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getComplaintsByFarmer = async (farmerId) => {
    setError(null);
    setLoading(true);
    try {
      const response = await get(`complain/my/${farmerId}`);
      return response;
    } catch (err) {
      setError(err.response?.farmerId?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getComplaintsByFarmer,
  };
};

export default useComplaints;
