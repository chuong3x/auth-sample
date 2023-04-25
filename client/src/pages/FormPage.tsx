import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import DocForm from "../components/DocForm/DocForm";

const FormPage: React.FC = () => {
  const { id } = useParams();
  return (
    <Flex w="full" h="full" direction="column" overflowY="scroll">
      {id && <DocForm id={id} />}
    </Flex>
  );
};

export default FormPage;
