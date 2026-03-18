import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineusers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      // 401 is expected when not logged in
      if (error.response?.status !== 401) {
        console.log("Error in authCheck: ", error);
      }
      get().disconnectSocket();
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().disconnectSocket();
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoginIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, onlineusers: [] });

      toast.success("Logout successfully");

    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      get().disconnectSocket();
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are send with the connection
    });

    socket.connect();

    set({ socket: socket });

    //listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineusers: userIds });
    });

    socket.on("disconnect", () => {
      set({ socket: null, onlineusers: [] });
    });

    // Force a graceful close on tab close/reload to reduce stale presence.
    const handleBeforeUnload = () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    socket.on("disconnect", () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.off("getOnlineUsers");
      socket.disconnect();
    }
    set({ socket: null, onlineusers: [] });
  },
}));
