"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/auth";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          email: data.user.email ?? "",
          name: data.user.user_metadata?.name ?? "User",
          avatar: data.user.user_metadata?.avatar_url,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
