import { Flex, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

interface ParagraphInputProps {
    param: string;
    setPayload: (payload: any) => void;
}

const ParagraphInput: React.FC<ParagraphInputProps> = ({
    param,
    setPayload,
}) => {
    const [value, setValue] = useState<string>();
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };
    useEffect(() => {
        setPayload({ param: value });
    }, [value]);
    return (
        <Flex key={param} mb="2">
            <Text>{`${param.slice(2, param.length).toUpperCase()}: `}</Text>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder={`Input your text or description!`}
            />
        </Flex>
    );
};

export default ParagraphInput;
