import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { useState, useCallback } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useRegions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [regions, setRegions] = useState([]);

  // Fetch all regions
  const fetchRegions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("regions").select("*");
      if (error) {
        throw error;
      }
      setRegions(data);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch regions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a region by ID
  const fetchRegionById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("regions").select("*").eq("region_id", id).single();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      //console.error(error); sonst immer error in konsole wenn region noch nicht existiert
      setError(error.message || "Failed to fetch region by ID.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new region
  const addRegion = async (region) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("regions").insert(region).select("*");
      if (error) {
        throw error;
      }
      setRegions((prevRegions) => [...prevRegions, ...data]);
      message.success("Region added successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to add region.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing region
  const updateRegion = async (id, updatedRegion) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("regions").update(updatedRegion).eq("id", id).select("*");
      if (error) {
        console.log("Error updating region:", error);
        throw error;
      }
      setRegions((prevRegions) => prevRegions.map((region) => (region.id === id ? data[0] : region)));
      message.success("Region updated successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to update region.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a region
  const deleteRegion = async (id) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("regions").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setRegions((prevRegions) => prevRegions.filter((region) => region.id !== id));
      message.success("Region deleted successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete region.");
    } finally {
      setIsLoading(false);
    }
  };

  return { regions, isLoading, error, fetchRegions, fetchRegionById, addRegion, updateRegion, deleteRegion };
};

export default useRegions;