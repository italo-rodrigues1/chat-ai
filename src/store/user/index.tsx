import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  token: string;
  avatar: string;
  isAuthenticated: boolean;
};

interface UserState {
  user: User | null;
}

export const useChatStore = create<UserState>((set) => ({
  user: null,
}));
