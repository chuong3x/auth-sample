import { Flex, Text, Input } from "@chakra-ui/react";

interface TimeInputProps {
  param: string;
  setPayload: (payload: any) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ param, setPayload }) => {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ [e.target.id]: e.target.value });
  };

  return (
    <Flex key={param} mb="2">
      <Text>{`${param.slice(2, param.length).toUpperCase()}: `}</Text>
      <Input id={param} onChange={handleChangeText} />
    </Flex>
  );
};

export default TimeInput;
