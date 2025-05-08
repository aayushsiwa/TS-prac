// src/theme/ThemeProviderC.tsx
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import lightTheme from "../theme/lightTheme";
import darkTheme from "../theme/darkTheme";
import { ColorModeContextType } from "../types";

const ColorModeContext = createContext<ColorModeContextType>({
    toggleTheme: () => {},
    darkMode: false,
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProviderC = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark";
    });

    const theme = useMemo(
        () => (darkMode ? darkTheme : lightTheme),
        [darkMode]
    );

    const toggleTheme = () => {
        const newMode = !darkMode;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        setDarkMode(newMode);
    };

    return (
        <ColorModeContext.Provider value={{ toggleTheme, darkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
