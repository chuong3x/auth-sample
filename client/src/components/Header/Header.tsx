import { Link } from "react-router-dom";
import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";

import { useAppSelector } from "../../app/hooks";
import { authSelector } from "../../redux/auth.slice";
import AuthModal from "../Common/AuthModal";
import UserInfo from "../Common/UserInfo";
import TBFLogo from "../../assets/logo";

const Header: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { token } = useAppSelector(authSelector);

    return (
        <Flex
            h="52px"
            w="full"
            py="2"
            justify="space-between"
            align="center"
            color="white"
        >
            <Box w="10" h="10">
                <Link to="/">
                    <TBFLogo fillColorCode={"#ffffff"} />
                </Link>
            </Box>

            <Flex>
                {!token ? (
                    <Button colorScheme="blue" onClick={onOpen}>
                        Get Started
                    </Button>
                ) : (
                    <UserInfo />
                )}
            </Flex>
            <AuthModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
export default Header;
