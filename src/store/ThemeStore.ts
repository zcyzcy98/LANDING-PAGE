import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      toggleTheme: () => {
        const newTheme: Theme = get().theme === "light" ? "dark" : "light";
        // 避免在 SSR（如 Next.js）时报错，只有在浏览器环境下才执行下面的操作
        if (typeof document !== "undefined") {
          // HTML 根节点 
          // 当 newTheme 是 "dark" 时给 <html> 添加 dark class
          // 当 newTheme 是 "light" 时移除 dark class
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
          );
        }

        set({ theme: newTheme });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }
  )
);
