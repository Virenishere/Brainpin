import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<ThemeState>((set) => {
  const theme = localStorage.getItem("theme");
  const initialMode = theme === "dark";

  // Apply to <html> on init
  document.documentElement.classList.toggle("dark", initialMode);

  return {
    darkMode: initialMode,
    toggleDarkMode: () => {
      set((state) => {
        const newMode = !state.darkMode;
        localStorage.setItem("theme", newMode ? "dark" : "light");

        // Toggle dark class on <html>
        document.documentElement.classList.toggle("dark", newMode);
        return { darkMode: newMode };
      });
    },
  };
});

export default useThemeStore;
