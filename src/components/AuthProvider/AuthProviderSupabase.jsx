import { useEffect, useState, useRef } from "react";
import { AuthContextSupabase } from "../../context/AuthContextSupabase";
import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import useInitializeUserData from "../../api/user/useInitializeUserData";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";

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
  const { addListsAndVisits } = useInitializeUserData();
  const { user } = useAuthContextSupabase();

  const signInAnonymously = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.user;
  }

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

  // On initial load, check for session and sign in anonymously if needed
  const initAuth = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        // No session, sign in anonymously
        const user = await signInAnonymously();
        setUserData(user);
        //await addListsAndVisits(user);
        //window.location.reload();
      } else {
        setUserData(data.session.user);
        //await addListsAndVisits(data.session.user);
      }
    } catch (error) {
      console.error(error);
      message.error("Error during authentication");
    } finally {
      setIsLoading(false);
    }
  };
  initAuth();

  return () => {
    authListener?.subscription?.unsubscribe();
  };
}, []);

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    if (localStorage.getItem("hasInitialized") === "true") return;
    async function add() {
      if (userData && userData.id) {
        await addListsAndVisits(userData);
        hasInitialized.current = true;
        localStorage.setItem("hasInitialized", "true");
      }
    }
    add();
  }, [userData]);

  return (
    <AuthContextSupabase.Provider value={{ user: userData, setUser: setUserData, isLoading, signOut }}>
      {children}
    </AuthContextSupabase.Provider>
  );
};

export default AuthProviderSupabase;