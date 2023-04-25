import { VStack, Box } from "@chakra-ui/react";
import { SlHome, SlUser, SlCreditCard } from "react-icons/sl";

import { useAppSelector } from "../../app/hooks";
import { dashboardSelector } from "../../redux/dashboard.slice";

import SidebarItem from "./SidebarItem";
//
interface SidebarProps {}
const navItems = [
    { icon: SlHome, name: "Templates" },
    { icon: SlCreditCard, name: "Billing" },
    { icon: SlUser, name: "Profile" },
];
//
const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <VStack
            w="300px"
            h="full"
            px="6"
            bg="blackAlpha.400"
            borderRadius="16px"
        >
            <Box w="full" h="100px" borderRadius="16px"></Box>
            <VStack w="full" spacing={2}>
                {navItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        icon={item.icon}
                        name={item.name}
                    />
                ))}
            </VStack>
        </VStack>
    );
};

export default Sidebar;
