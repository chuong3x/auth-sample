import { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface MainLayoutProps {
    children: ReactElement;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Flex w={{ base: "full" }} h="full" px="6" direction="column">
            <Header />
            {children}
            <Footer />
        </Flex>
    );
};
export default MainLayout;
