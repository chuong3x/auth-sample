import {
    Flex,
    Menu,
    MenuButton,
    Button,
    Avatar,
    MenuList,
    MenuItem,
    Icon,
    Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SlUser, SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { useLogoutMutation } from "../../redux/auth.api";
import { logout } from "../../redux/auth.slice";

interface UserInfoProps {}
const UserInfo: React.FC<UserInfoProps> = () => {
    const dispatch = useAppDispatch();
    const [logoutApi, logoutApiResult] = useLogoutMutation();
    useEffect(() => {
        if (logoutApiResult.data) {
            dispatch(logout());
        }
    }, [logoutApiResult]);
    return (
        <Flex h="full" align="center">
            <Menu>
                <MenuButton
                    as={Button}
                    bg="transparent"
                    _hover={{
                        bg: "transparent",
                    }}
                    _active={{
                        bg: "transparent",
                    }}
                    _focus={{
                        bg: "transparent",
                    }}
                >
                    <Flex justify="center" align="center">
                        <Avatar name="Chuong Do" size="sm" />
                        <Text ml="3">{"Chuong"}</Text>
                    </Flex>
                </MenuButton>
                <MenuList
                    border="transparent"
                    backdropFilter="blur(63px)"
                    bg="linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)"
                    borderRadius="20px"
                >
                    <Flex flexDirection="column">
                        <MenuItem
                            borderRadius="8px"
                            _hover={{
                                bg: "transparent",
                            }}
                            _active={{
                                bg: "transparent",
                            }}
                            _focus={{
                                bg: "transparent",
                            }}
                            bg="transparent"
                            mb="10px"
                            color="white"
                        >
                            <Link to="/dashboard">
                                <Flex justify="center" align="center">
                                    <Icon as={SlUser} />
                                    <Text ml="2">Dashboard</Text>
                                </Flex>
                            </Link>
                        </MenuItem>
                        <MenuItem
                            borderRadius="8px"
                            _hover={{
                                bg: "transparent",
                            }}
                            _active={{
                                bg: "transparent",
                            }}
                            _focus={{
                                bg: "transparent",
                            }}
                            bg="transparent"
                            color="white"
                            onClick={() => logoutApi()}
                        >
                            <Icon as={SlLogout} />
                            <Text ml="2">Log out</Text>
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </Flex>
    );
};
export default UserInfo;
