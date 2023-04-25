import { Flex, Text, Checkbox } from "@chakra-ui/react";

interface BooleanInputParam {
  param: string;
  setPayload: (payload: any) => void;
}

const BooleanInput: React.FC<BooleanInputParam> = ({ param, setPayload }) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ [e.target.id]: e.target.checked });
  };

  return (
    <Flex key={param} mb="2" align="center">
      <Text mr="4">{`${param.slice(5, param.length).toUpperCase()}: `}</Text>
      <Checkbox id={param} onChange={handleCheck} />
    </Flex>
  );
};

export default BooleanInput;
