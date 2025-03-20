import { create } from "zustand";

interface LoadingState {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useStoreLoading = create<LoadingState>((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
}));