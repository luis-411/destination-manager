import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";
import { message } from "antd";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useVisitsStore = create((set, get) => ({
  visits: [],
  isLoading: false,
  error: "",
  // Fetch all visits
  fetchVisits: async () => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("visits").select("*");
      if (error) throw error;
      set({ visits: data });
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to fetch visits." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Add a new visit
  addVisit: async (visit) => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("visits").insert(visit).select("*");
      if (error) throw error;
      set((state) => ({ visits: [...state.visits, ...data] }));
      message.success("Visit added successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to add visit." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Update an existing visit
  updateVisit: async (id, updatedVisit) => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("visits").update(updatedVisit).eq("id", id).select("*");
      if (error) throw error;
      set((state) => ({
        visits: state.visits.map((visit) => (visit.id === id ? data[0] : visit)),
      }));
      message.success("Visit updated successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to update visit." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Delete a visit
  deleteVisit: async (id) => {
    set({ isLoading: true, error: "" });
    try {
      const { error } = await supabase.from("visits").delete().eq("id", id);
      if (error) throw error;
      set((state) => ({
        visits: state.visits.filter((visit) => visit.id !== id),
      }));
      message.success("Visit deleted successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to delete visit." });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useVisitsStore;