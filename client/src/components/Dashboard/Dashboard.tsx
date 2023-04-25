import { Box, Flex, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { useLoadQuery } from "../../redux/upload.api";
import TemplateRow from "../Tables/TemplateRow";

const Dashboard: React.FC = () => {
    const { data, isFetching, isError, isSuccess } = useLoadQuery();
    return (
        <Flex flex="1" h="full" direction="column" pl="4">
            <Box w="full" h="52px"></Box>
            <Box
                borderRadius="32px"
                bg="blackAlpha.400"
                backdropFilter="blur(42px)"
                p="4"
                w="full"
                h="full"
            >
                <Table color="#fff">
                    <Thead>
                        <Tr my=".8rem" ps="0px" color="gray.400">
                            <Th
                                ps="0px"
                                color="gray.400"
                                borderBottomColor="#56577A"
                            >
                                File name
                            </Th>
                            <Th color="gray.400" borderBottomColor="#56577A">
                                Size
                            </Th>
                            <Th color="gray.400" borderBottomColor="#56577A">
                                Upload Date
                            </Th>
                            <Th borderBottomColor="#56577A"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isSuccess &&
                            data.data.map((template, index, arr) => {
                                return (
                                    <TemplateRow
                                        key={index}
                                        template={template}
                                        index={index}
                                    />
                                );
                            })}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default Dashboard;
