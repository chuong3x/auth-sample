import { useDropzone } from "react-dropzone";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    Button,
    Text,
    List,
    ModalFooter,
} from "@chakra-ui/react";
import { useUploadMutation } from "../../redux/upload.api";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
    const [uploadApi, uploadApiResult] = useUploadMutation();
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
        accept: {
            "application/pdf": [".docx"],
        },
    });
    const handleUploadDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        uploadApi(formData);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="whiteAlpha.200" backdropFilter="blur(42px)">
                <ModalHeader>Upload document</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        h="200px"
                        border="3px"
                        borderStyle="dashed"
                        borderColor="gray.200"
                        {...getRootProps({ className: "dropzone" })}
                    >
                        <input {...getInputProps()} />
                        <Flex
                            flex="1"
                            w="full"
                            align="center"
                            justify="center"
                            border="3px dashed gray.300"
                        >{`Drag & drop file here`}</Flex>
                        <Button
                            mb="20px"
                            onClick={open}
                            isDisabled={uploadApiResult.isLoading}
                        >
                            Choose file from device
                        </Button>
                    </Flex>
                    <Flex direction="column" mt="30px">
                        <Text>File:</Text>
                        <List>
                            {acceptedFiles.map((item) => (
                                <Text key={item.webkitRelativePath}>
                                    {item.name}
                                </Text>
                            ))}
                        </List>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr="auto"
                        isDisabled={
                            uploadApiResult.isLoading ||
                            acceptedFiles.length < 1
                        }
                        onClick={handleUploadDocument}
                        isLoading={uploadApiResult.isLoading}
                        loadingText={"Uploading..."}
                    >
                        Upload
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UploadModal;
