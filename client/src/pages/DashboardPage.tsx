import { Flex } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard/Dashboard";
import UploadButton from "../components/Dashboard/UploadButton";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardPage: React.FC = () => {
    return (
        <Flex flex="1" h="full" align="center" justify="center">
            <Sidebar />
            <Dashboard />
            <UploadButton />
        </Flex>
    );
};

export default DashboardPage;
