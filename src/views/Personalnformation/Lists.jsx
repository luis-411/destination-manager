import React, { useContext, useEffect } from 'react';
import useLists from '../../api/useLists';
import { AuthContextSupabase } from '../../context/AuthContextSupabase';
import ListCard from './ListCard';

const Lists = () => {
  const { user } = useContext(AuthContextSupabase); // Get the logged-in user from AuthContext
  const { lists, isLoading, error, fetchLists } = useLists();

  useEffect(() => {
    if (user) {
      fetchLists(); // Fetch lists if a user is logged in
    }
  }, [user, fetchLists]);

  if (!user) {
    return <div>Please log in to view your lists.</div>; // Placeholder for no logged-in user
  }

  if (isLoading) {
    return <div>Loading your lists...</div>; // Loading state
  }

  // if (error) {
  //   return <div>Error: {error}</div>; // Error state
  // }

  const updateLists = async () => {
    try {
      await fetchLists(); // Fetch lists again to ensure the latest data
    } catch (error) {
      console.error("Error updating lists:", error);
    }
  };

  return (
    <div>
      <h4 style={{fontWeight: "600"}}>Your Lists</h4>
      {lists.length === 0 ? (
        <p>You have not created any lists yet.</p>
      ) : (
          lists
            .filter((list) => list.user_id === user.id) // Filter lists by the logged-in user's ID
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((list) => (
              //<li key={list.id}>{list.title}</li> // Display the title of each list
              <ListCard id={list.id} title={list.title} description={list.description} emoji={list.emoji} regions={list.regions} updateLists={updateLists}/>
            ))
      )}
    </div>
  );
};

export default Lists;