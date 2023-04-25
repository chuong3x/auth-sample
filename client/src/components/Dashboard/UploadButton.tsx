import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { SlCloudUpload } from "react-icons/sl";
import UploadModal from "../Common/UploadModal";

interface UploadButtonProps {}
const UploadButton: React.FC<UploadButtonProps> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                pos="fixed"
                w="60px"
                h="60px"
                bottom="60px"
                right="60px"
                borderRadius="50%"
                bg="blue.400"
                onClick={onOpen}
            >
                <Flex w="full" h="full" justify={"center"} align="center">
                    <Icon w="full" h="full" as={SlCloudUpload} />
                </Flex>
            </Button>
            <UploadModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
export default UploadButton;
