import { createContext, useContext } from "react";

export const AuthContextSupabase = createContext({
  user: undefined,
  isLoading: false,
  setUser: () => {},
  signOut: () => {},
});

export const useAuthContextSupabase = () => useContext(AuthContextSupabase);