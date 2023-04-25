import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Button,
    Text,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    chakra,
    Flex,
    ModalCloseButton,
    Box,
    Icon,
} from "@chakra-ui/react";
import { useLoginMutation, useRegisterMutation } from "../../redux/auth.api";
import TBFLogo from "../../assets/logo";
import IGoogle from "../../assets/icons/google";
import { login, error } from "../../redux/auth.slice";
import { useAppDispatch } from "../../app/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}
// Shape of form values
interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface LoginFormValues {
    email: string;
    password: string;
}
const FormikField = chakra(Field);
const AuthModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const [register, registerResult] = useRegisterMutation();
    const [loginApi, loginApiResult] = useLoginMutation();
    const [mode, setMode] = useState<"register" | "login">("login");

    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, "*Name at least 1 characters")
            .max(50, "*Name maximum 50 character")
            .required("*Name required"),
        email: Yup.string()
            .email("Invalid email")
            .required("*Email required")
            .matches(
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                "Invalid email"
            ),
        password: Yup.string()
            .min(6, "*Password at least 6 characters")
            .max(50, "*Password maximum 50 character")
            .required("*Password required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), ""],
            "*Passwords must match!"
        ),
    });
    const validateLogin = Yup.object().shape({
        email: Yup.string()
            .email("*Invalid email")
            .required("*Email required")
            .matches(
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                "Invalid email"
            ),
        password: Yup.string()
            .min(6, "*Password at least 6 characters")
            .max(50, "*Password maximum 50 character")
            .required("*Password required"),
    });
    const handleSubmit = (payload: RegisterFormValues | LoginFormValues) => {
        if (mode === "register") {
            register(payload as RegisterFormValues);
        } else {
            loginApi(payload as LoginFormValues);
        }
    };
    const handleChangeMode = () => {
        mode === "register" ? setMode("login") : setMode("register");
    };

    useEffect(() => {
        if (loginApiResult.data) {
            dispatch(login(loginApiResult.data));
            onClose();
        } else if (loginApiResult.isError && "data" in loginApiResult.error) {
            let serverError = loginApiResult.error as FetchBaseQueryError;
            dispatch(error(serverError));
        }
    }, [loginApiResult]);
    useEffect(() => {
        if (registerResult.isSuccess) {
            onClose();
        } else if (registerResult.isError && "data" in registerResult.error) {
            let serverError = registerResult.error as FetchBaseQueryError;
            dispatch(error(serverError));
        }
    }, [registerResult]);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="blackAlpha.700" alignSelf={"center"}>
                    <ModalHeader>
                        {mode === "register" ? "Sign up" : "Sign in"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            mb="4"
                        >
                            <Box w="60px" h="60px">
                                <TBFLogo fillColorCode="#ffffff" />
                            </Box>
                            <Text fontSize="24px" fontWeight={600}>
                                {mode === "register"
                                    ? "Create an account"
                                    : "Sign in"}
                            </Text>
                            <Text fontSize="16px" fontWeight={400}>
                                BIM start at end
                            </Text>
                        </Flex>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            validationSchema={
                                mode === "register"
                                    ? validateSchema
                                    : validateLogin
                            }
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Flex direction="column" px="4">
                                        {mode === "register" && (
                                            <Flex direction="column" mb="2">
                                                <Text
                                                    _after={{
                                                        content: '"*"',
                                                        color: "red",
                                                    }}
                                                >
                                                    Name
                                                </Text>
                                                <FormikField
                                                    name="name"
                                                    h="38px"
                                                    border="1px solid gray"
                                                    px="2"
                                                    mb="2"
                                                    borderRadius="4px"
                                                    outline="none"
                                                />
                                                {errors.name && touched.name ? (
                                                    <Text color="red">
                                                        {errors.name}
                                                    </Text>
                                                ) : null}
                                            </Flex>
                                        )}
                                        <Flex direction="column" mb="2">
                                            <Text
                                                _after={{
                                                    content: '"*"',
                                                    color: "red",
                                                }}
                                            >
                                                Email
                                            </Text>
                                            <FormikField
                                                name="email"
                                                type="email"
                                                h="38px"
                                                border="1px solid gray"
                                                px="2"
                                                mb="2"
                                                borderRadius="4px"
                                                outline="none"
                                            />
                                            {errors.email && touched.email ? (
                                                <Text color="red">
                                                    {errors.email}
                                                </Text>
                                            ) : null}
                                        </Flex>
                                        <Flex direction="column" mb="2">
                                            <Text
                                                _after={{
                                                    content: '"*"',
                                                    color: "red",
                                                }}
                                            >
                                                Password
                                            </Text>
                                            <FormikField
                                                name="password"
                                                type="password"
                                                h="38px"
                                                border="1px solid gray"
                                                px="2"
                                                mb="2"
                                                borderRadius="4px"
                                                outline="none"
                                            />
                                            {errors.password &&
                                            touched.password ? (
                                                <Text color="red">
                                                    {errors.password}
                                                </Text>
                                            ) : null}
                                        </Flex>
                                        {mode === "register" && (
                                            <Flex direction="column" mb="3">
                                                <Text
                                                    _after={{
                                                        content: '"*"',
                                                        color: "red",
                                                    }}
                                                >
                                                    Confirm password
                                                </Text>
                                                <FormikField
                                                    name="confirmPassword"
                                                    type="password"
                                                    h="38px"
                                                    border="1px solid gray"
                                                    px="2"
                                                    mb="2"
                                                    borderRadius="4px"
                                                    outline="none"
                                                />
                                                {errors.confirmPassword &&
                                                touched.confirmPassword ? (
                                                    <Text color="red">
                                                        {errors.confirmPassword}
                                                    </Text>
                                                ) : null}
                                            </Flex>
                                        )}
                                    </Flex>
                                    <Flex
                                        h="100px"
                                        mt="4"
                                        px="4"
                                        direction="column"
                                        justify="space-between"
                                    >
                                        <Button
                                            type="submit"
                                            colorScheme="teal"
                                            disabled={
                                                loginApiResult.isLoading ||
                                                registerResult.isLoading
                                            }
                                        >
                                            {mode === "register"
                                                ? "Create account"
                                                : "Sign in"}
                                        </Button>
                                        <Button
                                            disabled={
                                                loginApiResult.isLoading ||
                                                registerResult.isLoading
                                            }
                                        >
                                            <Box w="20px" mr="2">
                                                <Icon as={IGoogle} />
                                            </Box>
                                            <Text>{`Sign ${
                                                mode === "register"
                                                    ? "up"
                                                    : "in"
                                            } with Google`}</Text>
                                        </Button>
                                    </Flex>
                                    <Flex justify="center" my="7">
                                        <Text>
                                            {mode === "register"
                                                ? "Already have an account?"
                                                : "Don't have an account?"}
                                        </Text>
                                        <Text
                                            color="blue.600"
                                            ml="2"
                                            cursor="pointer"
                                            onClick={handleChangeMode}
                                        >
                                            {mode === "register"
                                                ? "Login"
                                                : "Register"}
                                        </Text>
                                    </Flex>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
