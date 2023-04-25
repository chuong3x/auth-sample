import { Flex, Text, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MultiInputProps {
    param: string;
    values: { [key: string]: any };
    setPayload: (payload: any) => void;
}

const MultiChoiceInput: React.FC<MultiInputProps> = ({
    param,
    values,
    setPayload,
}) => {
    const [choices, setChoices] = useState<{ [key: string]: any }>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChoices({ ...choices, [e.target.id]: e.target.checked });
    };
    useEffect(() => {
        setPayload({ ...choices });
    }, [choices]);
    return (
        <Flex key={param} mb="2">
            <Text>{`${param.slice(3, param.length).toUpperCase()}: `}</Text>
            {Object.keys(values).map((option: any, index: number) => (
                <Flex key={index}>
                    <Text>{option.toUpperCase()}</Text>
                    <Checkbox id={option} onChange={handleChange} />
                </Flex>
            ))}
        </Flex>
    );
};

export default MultiChoiceInput;
