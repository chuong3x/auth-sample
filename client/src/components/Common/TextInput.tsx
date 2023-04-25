import { Flex, Text, Input } from "@chakra-ui/react";

interface TextInputProps {
  param: string;
  setPayload: (payload: any) => void;
}

const TextInput: React.FC<TextInputProps> = ({ param, setPayload }) => {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ [e.target.id]: e.target.value });
  };

  return (
    <Flex key={param} mb="4" align="center">
      <Text mr="4">{`${param.slice(5, param.length).toUpperCase()}: `}</Text>
      <Input id={param} onChange={handleChangeText} />
    </Flex>
  );
};

export default TextInput;
