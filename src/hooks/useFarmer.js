import { useState } from "react";
import { get, put, post } from "../api/apiClient";

const useFarmer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFarmers = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await get("farmers/all");

      return res.farmers; // 👈 direct farmers return karo
    } catch (err) {
      const message =
        err.response?.data?.detail || "Failed to fetch farmers";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };
  const updateFarmer = async (email, data) => {
      setError(null);
      setLoading(true);
      try {
        const response = await put(`farmers/update/${email}`, data);
        return response;
      } catch (err) {
        setError(err.response?.data?.detail || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    };

  const blockFarmer = async (email) => {
    setError(null);
    setLoading(true);
    try {
      const response = await post("admin/farmers/block", { email });
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to block farmer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unblockFarmer = async (email) => {
    setError(null);
    setLoading(true);
    try {
      const response = await post("admin/farmers/unblock", { email });
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to unblock farmer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const farmerComplain = async () =>{
        setError(null);
      setLoading(true);
      try {
        const response = await put(`farmers/update/${email}`, data);
        return response;
      } catch (err) {
        setError(err.response?.data?.detail || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    }
  return {
    loading,
    error,
    getFarmers,
    updateFarmer,
    blockFarmer,
    unblockFarmer,
  };
};

export default useFarmer;