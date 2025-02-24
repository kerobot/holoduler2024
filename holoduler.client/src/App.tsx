import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import theme from "./theme/theme";
import React from "react";

export default function App() {
    return (
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ChakraProvider>
        </React.StrictMode>
    );
}
