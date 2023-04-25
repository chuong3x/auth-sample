import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { useGetParamsQuery, usePostParamsMutation } from "../../redux/doc.api";
import { IDocParams } from "../../types";
import TextInput from "../Common/TextInput";
import NumInput from "../Common/NumInput";
import BooleanInput from "../Common/BooleanInput";
import DateInput from "../Common/DateInput";
import OptionsInput from "../Common/OptionsInput";
import MultiChoiceInput from "../Common/MultiChoiceInput";
import ParagraphInput from "../Common/ParagraphInput";
import TimeInput from "../Common/TimeInput";
import DropdownInput from "../Common/DropdownInput";

interface DocFormProps {
    id: string;
}
const DocForm: React.FC<DocFormProps> = ({ id }) => {
    const { data } = useGetParamsQuery(id);
    const [postParams, postParamsResult] = usePostParamsMutation();
    const [payload, setPayload] = useState<IDocParams>({});
    const [isActive, setIsActive] = useState<boolean>(false);
    const handleSubmit = () => {
        postParams({ id: id, params: payload });
    };
    const handleSetPayload = (param: { [key: string]: any }) => {
        setPayload({ ...payload, ...param });
    };
    useEffect(() => {
        const notContainFalsy = Object.values(payload).every(
            (value) => Boolean(value) === true
        );
        if (
            notContainFalsy &&
            data?.data &&
            Object.keys(payload).length === Object.keys(data.data).length
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [payload]);
    return (
        <Flex direction="column" w="full" align="center" justify="center">
            <Flex
                direction="column"
                w={{ base: "360px", md: "600px", lg: "900px", xl: "1200px" }}
                align="flex-start"
                justify="center"
                border={"1px solid gray"}
                borderRadius="8px"
                p="8"
            >
                {data?.data &&
                    Object.keys(data.data).map((param) => {
                        if (param.startsWith("TEXT_")) {
                            return (
                                <TextInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("NUM_")) {
                            return (
                                <NumInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("BOOL_")) {
                            return (
                                <BooleanInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("DATE_")) {
                            return (
                                <DateInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("OP_")) {
                            return (
                                <OptionsInput
                                    key={param}
                                    param={param}
                                    values={data.data[param]}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("MC_")) {
                            return (
                                <MultiChoiceInput
                                    key={param}
                                    param={param}
                                    values={data.data[param]}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("PARA_")) {
                            return (
                                <ParagraphInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("SELE_")) {
                            return (
                                <DropdownInput
                                    key={param}
                                    param={param}
                                    values={data.data[param]}
                                    setPayload={handleSetPayload}
                                />
                            );
                        } else if (param.startsWith("TIME_")) {
                            return (
                                <TimeInput
                                    key={param}
                                    param={param}
                                    setPayload={handleSetPayload}
                                />
                            );
                        }
                    })}
            </Flex>
            <Flex mt="4">
                <Button isDisabled={!isActive} onClick={handleSubmit}>
                    Download
                </Button>
            </Flex>
        </Flex>
    );
};

export default DocForm;
