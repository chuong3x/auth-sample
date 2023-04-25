import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";

import App from "./App";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
