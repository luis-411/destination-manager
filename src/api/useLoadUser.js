import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContextSupabase } from "../context/AuthContextSupabase";
import { useState } from "react";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useLoadUser = (signUp) => {
  const navigate = useNavigate();
  const { setUser } = useAuthContextSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onLoad = async (values) => {
    setIsLoading(true);
    try {
      let response;
      if (signUp) {
        // Sign up with Supabase
        response = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: { username: values.username }, // Store additional user data
          },
        });
      } else {
        // Sign in with Supabase
        response = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      }

      if (response.error) {
        throw response.error;
      }

      const { user } = response.data;
      setUser(user); // Set the user in the context
      message.success(`Welcome ${user.email}!`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, setError, onLoad };
};

export default useLoadUser;