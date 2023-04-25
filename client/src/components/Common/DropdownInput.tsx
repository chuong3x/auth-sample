import { Flex, Text, Input, Select } from "@chakra-ui/react";

interface DropdownInputProps {
    param: string;
    values: string[];
    setPayload: (payload: any) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
    param,
    values,
    setPayload,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPayload({ [e.target.id]: e.target.value });
    };

    return (
        <Flex key={param} mb="2">
            <Text>{`${param.slice(2, param.length).toUpperCase()}: `}</Text>
            <Select onChange={handleChange}>
                {values.map((value) => (
                    <option key={value}>{value}</option>
                ))}
            </Select>
        </Flex>
    );
};

export default DropdownInput;
