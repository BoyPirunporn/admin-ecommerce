import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'

interface StoreThemeProps {
    mode: "dark" | "light";
    setMode: (mode: "dark" | "light") => void
}

export const useStoreTheme = create<StoreThemeProps>()(
    persist(
        (set) => ({
            mode: "dark",
            setMode: (mode) => set({ mode })
        }), {
        name: "theme",
        storage: createJSONStorage(() => sessionStorage),
    }
    )
)