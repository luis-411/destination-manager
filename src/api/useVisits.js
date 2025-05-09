import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { useState, useCallback } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useVisits = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [visits, setVisits] = useState([]);

  // Fetch all visits
  const fetchVisits = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("visits").select("*");
      if (error) {
        throw error;
      }
      setVisits(data);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch visits.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new visit
  const addVisit = async (visit) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("visits").insert(visit).select("*");
      if (error) {
        throw error;
      }
      setVisits((prevVisits) => [...prevVisits, ...data]);
      message.success("Visit added successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to add visit.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing visit
  const updateVisit = async (id, updatedVisit) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("visits").update(updatedVisit).eq("id", id).select("*");
      if (error) {
        throw error;
      }
      setVisits((prevVisits) => prevVisits.map((visit) => (visit.id === id ? data[0] : visit)));
      message.success("Visit updated successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to update visit.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a visit
  const deleteVisit = async (id) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("visits").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setVisits((prevVisits) => prevVisits.filter((visit) => visit.id !== id));
      message.success("Visit deleted successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete visit.");
    } finally {
      setIsLoading(false);
    }
  };

  return { visits, isLoading, error, fetchVisits, addVisit, updateVisit, deleteVisit };
};

export default useVisits;