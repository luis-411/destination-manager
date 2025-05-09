import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lists, setLists] = useState([]);

  // Fetch all lists
  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("lists").select("*");
      if (error) {
        throw error;
      }
      setLists(data);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch lists.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new list
  const addList = async (list) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("lists").insert(list).select("*");
      if (error) {
        throw error;
      }
      setLists((prevLists) => [...prevLists, ...data]);
      message.success("List added successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to add list.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing list
  const updateList = async (id, updatedList) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("lists").update(updatedList).eq("id", id).select("*");
      if (error) {
        throw error;
      }
      setLists((prevLists) => prevLists.map((list) => (list.id === id ? data[0] : list)));
      message.success("List updated successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to update list.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a list
  const deleteList = async (id) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("lists").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
      message.success("List deleted successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete list.");
    } finally {
      setIsLoading(false);
    }
  };

    const fetchListByLink = async (link) => {
    const { data, error } = await supabase
      .from("lists")
      .select("*")
      .eq("link", link) //the security is in the code and not in the backend
      .single();
  
    if (error) {
      console.error("Error fetching list:", error);
      return null;
    }
  
    return data;
  };

  
  const generateLink = async (listId) => {
    try {
      const { data: existingList, error: fetchError } = await supabase
        .from("lists")
        .select("link")
        .eq("id", listId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // If the list already has a link, return it
      if (existingList?.link) {
        return existingList.link;
      }

      // If the list doesn't have a link, generate a new one
      const link = uuidv4(); // Generate a unique identifier
      const { data, error } = await supabase
        .from("lists")
        .update({ link })
        .eq("id", listId)
        .select("link")
        .single();

      if (error) {
        throw error;
      }

      return data.link;
    } catch (error) {
      console.error("Error generating shared link:", error);
      return null;
    }
  };

  return { lists, isLoading, error, fetchLists, addList, updateList, deleteList, generateLink, fetchListByLink  };
};

export default useLists;