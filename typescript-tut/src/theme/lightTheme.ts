// src/theme/lightTheme.ts
import { createTheme } from "@mui/material/styles";

const gridColor = "#ffffff";
const primaryMain = "#1976d2";
const secondaryMain = "#9c27b0";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: primaryMain },
        secondary: { main: secondaryMain },
        text: {
            primary: "#000000",
            secondary: "#ffffff",
        },
        background: {
            default: "#ffffff",
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
                        linear-gradient(to right, #ddd 1px, transparent 1px),
                        linear-gradient(to bottom, #ddd 0.5px, transparent 1px)
                    `,
                    backgroundSize: "10px 10px",
                    backgroundColor: "#fff",
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

export default lightTheme;
