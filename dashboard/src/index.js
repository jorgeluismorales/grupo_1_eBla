import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient({
    staleTime: Infinity,
    cacheTime: Infinity,
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#09d",
        },
        background: {
            default: "#E4EAEC",
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    paddingTop: 5,
                    paddingBottom: 5,
                }),
            },
        },
        MUIDataTable: {
            styleOverrides: {
                root: ({ theme }) => ({
                    boxShadow: "none",
                    border: "1px solid #ccc",
                }),
            },
        },
        MUIDataTableToolbar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }),
            },
        },
        MUIDataTableHeadCell: {
            styleOverrides: {
                root: ({ theme }) => ({
                    paddingTop: 15,
                    paddingBottom: 15,
                }),
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
