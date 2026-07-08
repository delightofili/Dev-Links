"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { setToken, clearToken } from "../token.js";
import { post, get } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // current logged in user — null means not logged in

  const [loading, setLoading] = useState(true);
  // true while we're checking if user is already logged in
  // prevents flash of "not logged in" before check completes

  async function checkAuth() {
    try {
      const data = await post("/api/auth/refresh", {});
      // try to refresh — if refresh token cookie exists, this works
      // user was previously logged in and their session is still valid

      setToken(data.data.accessToken);
      // store the access token in memory

      const userData = await get("/api/users/me");
      // fetch the full user profile

      setUser(userData.data);
      // store user in state — available to all components
    } catch {
      // no valid session — user is not logged in
      setUser(null);
    } finally {
      setLoading(false);
      // done checking — whether logged in or not
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth();
    }, 0);

    return () => clearTimeout(timer);
    // when the app loads, check if user has a valid session
  }, []);

  async function login(email, password) {
    const data = await post("/api/auth/login", { email, password });
    // call the backend login endpoint

    setToken(data.data.accessToken);
    // store access token in memory

    setUser(data.data.user);
    // store user data

    document.cookie = "isLoggedIn=true; path=/; max-age=604800";

    return data.data.user;
    // return user so login page can redirect
  }

  async function register(name, username, email, password) {
    const data = await post("/api/auth/register", {
      name,
      username,
      email,
      password,
    });

    setToken(data.data.accessToken);
    setUser(data.data.user);

    return data.data.user;
  }

  async function logout() {
    try {
      await post("/api/auth/logout", {});
      // tell backend to clear the refresh token cookie
    } catch {
      // even if this fails, clear local state
    }

    clearToken();
    // clear access token from memory

    setUser(null);
    // clear user from state — triggers re-render everywhere

    document.cookie = "isLoggedIn=; path=/; max-age=0";
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
