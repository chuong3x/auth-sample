import { Box, Text, HStack, Icon } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { AiOutlineTwitter } from "react-icons/ai";
const Footer: React.FC = () => {
    return (
        <HStack h="24px" w="full" justify="space-between">
            <Box display="inline-flex">
                <Text>{`© ${DateTime.now().year}`}</Text>
                <Text fontWeight="500" ml="2">{`THE BIM FACTORY`}</Text>
            </Box>
            <Box>
                <Icon as={AiOutlineTwitter} />
            </Box>
        </HStack>
    );
};
export default Footer;
