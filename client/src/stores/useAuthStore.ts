import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  accessToken: string;
  logout: () => void;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: "",
      setAccessToken(accessToken: string) {
        set((state) => ({
          ...state,
          accessToken: accessToken,
          isAuthenticated: true,
        }));
      },
      setUser(user) {
        set((state) => ({
          ...state,
          user,
          isAuthenticated: true,
        }));
      },
      logout() {
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
