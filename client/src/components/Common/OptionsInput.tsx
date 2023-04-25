import { Flex, Text, RadioGroup, Radio } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface OptionsInputProps {
    param: string;
    values: { [key: string]: any };
    setPayload: (payload: any) => void;
}

const OptionsInput: React.FC<OptionsInputProps> = ({
    param,
    values,
    setPayload,
}) => {
    const [radioValue, setRadioValue] = useState("");

    useEffect(() => {
        let tempObj = {} as { [key: string]: any };
        Object.keys(values).forEach((k) => {
            if (k === radioValue) {
                tempObj[k] = true;
            } else {
                tempObj[k] = false;
            }
        });
        setPayload(tempObj);
    }, [radioValue]);
    return (
        <Flex key={param} mb="2">
            <Text>{`${param.slice(2, param.length).toUpperCase()}: `}</Text>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
                {Object.keys(values).map((option: any, index: number) => (
                    <Flex key={index}>
                        <Text>{option.toUpperCase()}</Text>
                        <Radio value={option} />
                    </Flex>
                ))}
            </RadioGroup>
        </Flex>
    );
};

export default OptionsInput;
