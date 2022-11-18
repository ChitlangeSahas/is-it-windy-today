import React from 'react';
import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function App() {
    return (
        <CssVarsProvider>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Typography level={"h1"}>Hi 👋</Typography>
            </Box>
        </CssVarsProvider>
    );
}
