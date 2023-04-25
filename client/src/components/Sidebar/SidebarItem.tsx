import { Text, Icon, Flex, Button } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dashboardSelector, setPage } from "../../redux/dashboard.slice";

interface SidebarItemProps {
    icon: IconType;
    name: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, name }) => {
    const dispatch = useAppDispatch();
    const { page } = useAppSelector(dashboardSelector);
    const handleClick = () => {
        dispatch(setPage(name.toLowerCase()));
    };
    return (
        <Button
            variant="transparent-with-icon"
            justifyContent="flex-start"
            h="54px"
            w="full"
            borderRadius="16px"
            backdropFilter="blur(42px)"
            isActive={page === name.toLowerCase()}
            _active={{ bg: "whiteAlpha.200" }}
            onClick={handleClick}
        >
            <Flex
                justify="center"
                align="center"
                w="30px"
                h="30px"
                borderRadius="12px"
                bg={page === name.toLowerCase() ? "purple" : "whiteAlpha.300"}
            >
                <Icon as={icon} />
            </Flex>
            <Text ml="3">{name}</Text>
        </Button>
    );
};

export default SidebarItem;
