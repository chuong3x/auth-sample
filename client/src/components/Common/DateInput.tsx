import { Flex, Text, Input } from "@chakra-ui/react";

interface DateInputParam {
  param: string;
  setPayload: (payload: any) => void;
}

const DateInput: React.FC<DateInputParam> = ({ param, setPayload }) => {
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ [e.target.id]: e.target.value });
  };

  return (
    <Flex key={param} mb="2" align="center">
      <Text mr="4">{`${param.slice(5, param.length).toUpperCase()}: `}</Text>
      <Input id={param} type={"date"} onChange={handleChangeText} />
    </Flex>
  );
};

export default DateInput;
