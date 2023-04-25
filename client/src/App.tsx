import { useEffect } from "react";
import { Flex, useToast, Image, Box, useColorMode } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Page from "./hocs/Page";
import ProtectRoute from "./hocs/ProtectRoute";

import { useCheckTokenQuery } from "./redux/auth.api";
import { useAppSelector } from "./app/hooks";
import { authSelector } from "./redux/auth.slice";
import routes from "./routes";

import bg from "./assets/background/background-body-admin.png";

function App() {
    const { isFetching } = useCheckTokenQuery();
    const toast = useToast();
    const { message, toggle } = useAppSelector(authSelector);
    const { setColorMode } = useColorMode();
    useEffect(() => {
        if (message) {
            toast({
                title: message,
                position: "top",
                status: "info",
                duration: 1000,
            });
        }
    }, [message, toggle]);
    useEffect(() => {
        setColorMode("dark");
    }, []);
    return (
        <Flex
            pos="relative"
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
        >
            <Image pos="absolute" w="full" h="full" zIndex="-2" src={bg} />
            <Routes>
                {!isFetching &&
                    routes.map((route, index) => {
                        const { path, title, isPrivate } = route;
                        const Component = route.element;
                        return isPrivate ? (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <ProtectRoute>
                                        <Page title={title}>
                                            {route.layout ? (
                                                <route.layout>
                                                    <Component />
                                                </route.layout>
                                            ) : (
                                                <Component />
                                            )}
                                        </Page>
                                    </ProtectRoute>
                                }
                            ></Route>
                        ) : (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Page title={title}>
                                        {route.layout ? (
                                            <route.layout>
                                                <Component />
                                            </route.layout>
                                        ) : (
                                            <Component />
                                        )}
                                    </Page>
                                }
                            ></Route>
                        );
                    })}
            </Routes>
        </Flex>
    );
}

export default App;
