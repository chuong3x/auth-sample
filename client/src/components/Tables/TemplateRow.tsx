import { Link as RouterLink } from "react-router-dom";
import {
    Tr,
    Td,
    Flex,
    Icon,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
} from "@chakra-ui/react";
import { SlDoc, SlOptionsVertical, SlTrash, SlPencil } from "react-icons/sl";

import { ITemplate } from "../../types";
import bytesToSize from "../../utils/bytesToSize";

interface TemplateRowProps {
    template: ITemplate;
    index: number;
}

const TemplateRow: React.FC<TemplateRowProps> = ({ template, index }) => {
    return (
        <Tr>
            <Td
                minWidth={{ sm: "250px" }}
                borderRadius="20px 0 0 20px"
                h="40px"
                py="0"
                bg={index % 2 === 0 ? "transparent" : "whiteAlpha.400"}
            >
                <Link as={RouterLink} to={`/form/${template._id}`} w="full">
                    <Flex alignItems="center" minWidth="100%" flexWrap="nowrap">
                        <Icon as={SlDoc} h={"20px"} w={"20px"} mr="18px" />
                        <Text color="#fff" minWidth="100%">
                            {template.name}
                        </Text>
                    </Flex>
                </Link>
            </Td>
            <Td
                h="40px"
                py="0"
                bg={index % 2 === 0 ? "transparent" : "whiteAlpha.400"}
            >
                <Text color="#fff">{bytesToSize(Number(template.size))}</Text>
            </Td>
            <Td
                h="40px"
                py="0"
                bg={index % 2 === 0 ? "transparent" : "whiteAlpha.400"}
            >
                <Text color="#fff">{`${new Date(
                    template.createdAt
                ).toLocaleDateString()}`}</Text>
            </Td>

            <Td
                h="40px"
                py="0"
                bg={index % 2 === 0 ? "transparent" : "whiteAlpha.400"}
                border="none"
                borderRadius="0 20px 20px 0"
            >
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
                        <Icon as={SlOptionsVertical} />
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
                                color="white"
                                mb="10px"
                                // onClick={() => logoutApi()}
                            >
                                <Icon as={SlPencil} />
                                <Text ml="3">Edit</Text>
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
                            >
                                <Flex justify="center" align="center">
                                    <Icon as={SlTrash} />
                                    <Text ml="3">Delete</Text>
                                </Flex>
                            </MenuItem>
                        </Flex>
                    </MenuList>
                </Menu>
            </Td>
        </Tr>
    );
};
export default TemplateRow;
