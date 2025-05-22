import { create } from "zustand";
import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useListsStore = create((set, get) => ({
  lists: [],
  isLoading: false,
  error: "",
  // Fetch all lists
  fetchLists: async () => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("lists").select("*");
      if (error) throw error;
      set({ lists: data });
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to fetch lists." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Add a new list
  addList: async (list) => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("lists").insert(list).select("*");
      if (error) throw error;
      set((state) => ({ lists: [...state.lists, ...data] }));
      message.success("List added successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to add list." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Update an existing list
  updateList: async (id, updatedList) => {
    set({ isLoading: true, error: "" });
    try {
      const { data, error } = await supabase.from("lists").update(updatedList).eq("id", id).select("*");
      if (error) throw error;
      set((state) => ({
        lists: state.lists.map((list) => (list.id === id ? data[0] : list)),
      }));
      message.success("List updated successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to update list." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Delete a list
  deleteList: async (id) => {
    set({ isLoading: true, error: "" });
    try {
      const { error } = await supabase.from("lists").delete().eq("id", id);
      if (error) throw error;
      set((state) => ({
        lists: state.lists.filter((list) => list.id !== id),
      }));
      message.success("List deleted successfully!");
    } catch (error) {
      console.error(error);
      set({ error: error.message || "Failed to delete list." });
    } finally {
      set({ isLoading: false });
    }
  },
  // Fetch a list by link
  fetchListByLink: async (link) => {
    try {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .eq("link", link)
        .single();
      if (error) {
        console.error("Error fetching list:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error fetching list:", error);
      return null;
    }
  },
  // Generate a unique link for a list
  generateLink: async (listId) => {
    try {
      const { data: existingList, error: fetchError } = await supabase
        .from("lists")
        .select("link")
        .eq("id", listId)
        .single();

      if (fetchError) throw fetchError;

      if (existingList?.link) {
        return existingList.link;
      }

      const link = uuidv4();
      const { data, error } = await supabase
        .from("lists")
        .update({ link })
        .eq("id", listId)
        .select("link")
        .single();

      if (error) throw error;

      return data.link;
    } catch (error) {
      console.error("Error generating shared link:", error);
      return null;
    }
  },
}));

export default useListsStore;