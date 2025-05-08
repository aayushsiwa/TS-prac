// src/theme/darkTheme.ts
import { createTheme } from "@mui/material/styles";

const gridColor = "#2f2f2f";
const primaryMain = "#1976d2";
const secondaryMain = "#9c27b0";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: primaryMain },
        secondary: { main: secondaryMain },
        text: {
            primary: "#ffffff",
            secondary: gridColor,
        },
    },
    typography: {
        fontFamily: `"Consolas", "Courier New", monospace`,
        fontWeightRegular: 700,
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    backgroundColor: gridColor,
                    display: "flex",
                    justifyContent: "space-between",
                    border: "2px solid black",
                    borderRadius: "5rem",
                    marginBottom: "1rem",
                    userSelect: "none",
                    cursor: "pointer",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: gridColor,
                    borderRadius: "1rem",
                    border: "2px solid #000",
                    overflow: "hidden",
                    "& .MuiOutlinedInput-input": {
                        fontWeight: "bold",
                        fontSize: "1rem",
                    },
                    "& .MuiOutlinedInput-root fieldset": {
                        border: "none",
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: `
                        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                        linear-gradient(to bottom, ${gridColor} 0.5px, transparent 1px)
                    `,
                    backgroundSize: "10px 10px",
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

export default darkTheme;
