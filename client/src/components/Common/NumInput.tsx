import { Flex, Text, Input } from "@chakra-ui/react";

interface NumInputProps {
  param: string;
  setPayload: (payload: any) => void;
}

const NumInput: React.FC<NumInputProps> = ({ param, setPayload }) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ [e.target.id]: e.target.value });
  };

  return (
    <Flex>
      <Flex key={param} mb="2">
        <Text>{`${param.slice(2, param.length).toUpperCase()}: `}</Text>
        <Input id={param} type={"date"} onChange={handleChangeInput} />
      </Flex>
    </Flex>
  );
};

export default NumInput;
