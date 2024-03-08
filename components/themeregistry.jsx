"use client";

import { CssBaseline, createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { Inter, Questrial, DM_Mono } from "next/font/google";
import React, { useEffect } from "react";
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const inter = Inter({
    weight: ["300", "400", "500", "700"],
    style: ["normal"],
    subsets: ["latin"],
});

export const questrial = Questrial({
    weight: ["400"],
    subsets: ["latin"],
    display: 'swap',
    variable: '--questrial-font'
})

export const dm_mono = DM_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: 'swap',
    variable: '--dm-mono-font'
})


const light_theme = {
    primary: {
        main: '#343434',
        contrastText: '#F8FAFD'
    },
    background: {
        default: "#f4f6fc",
        paper: '#ffffff',
    },
    text: {
        primary: '#2E2E2E'
    },
}
const dark_theme = {
    primary: {
        main: '#f0f4f9',
        contrastText: '#444746'
    },
    background: {
        default: "#101010",
        paper: '#1e1e1e',
    },
    text: {
        primary: '#E3E3E3'
    }
}


const Themeregistry = ({ children }) => {
    const [mode, setMode] = React.useState('dark');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode == 'dark' ? 'dark' : 'light');
    })
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(
        () =>
            createTheme({
                components:{
                    MuiCard:{
                        defaultProps:{
                            elevation: mode == 'dark' ? 1 : 3,
                        },
                        // styleOverrides:{
                        //     root:{
                        //         backgroundImage: 'unset'
                        //     }
                        // }
                    }
                },
                typography: {
                    fontSize: 12,
                    fontFamily: inter.style.fontFamily,
                    h1: 'var(--h1-size)'
                },
                palette: {
                    mode,
                    ...(mode == 'dark' ? dark_theme : light_theme),
                },
            }),
        [mode],
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Themeregistry