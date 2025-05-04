import { useEffect, useState } from "react";
import { AuthContextSupabase } from "../../context/AuthContextSupabase";
import { createClient } from "@supabase/supabase-js";
import { message } from "antd";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);


const AuthProviderSupabase = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the logged-in user from Supabase
  const fetchLoggedInUser = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        // No active session
        setUserData(null);
        return;
      }
      setUserData(data.session.user); // Set the user from the session
    } catch (error) {
      console.error(error);
      message.error("Error while getting logged-in user details");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUserData(null);
      message.success("You have been logged out.");
    } catch (error) {
      console.error(error);
      message.error("Error while logging out.");
    }
  };

  // Subscribe to authentication state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUserData(session.user);
      } else {
        setUserData(null);
      }
    });

    // Fetch the user on initial load
    fetchLoggedInUser();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContextSupabase.Provider value={{ user: userData, setUser: setUserData, isLoading, signOut }}>
      {children}
    </AuthContextSupabase.Provider>
  );
};

export default AuthProviderSupabase;