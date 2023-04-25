import {
  CircularProgress,
  Flex,
  useColorModeValue,
  usePrefersReducedMotion,
  keyframes,
} from "@chakra-ui/react";

const fadeOut = keyframes`
from {
opacity: 1;
}
to {
opacity: 0;
}
`;
const Loading: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion ? undefined : `${fadeOut} linear 3s`;
  return (
    <Flex
      pos="fixed"
      top="0"
      left="0"
      w="full"
      h="full"
      justify="center"
      align="center"
      bg={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
      animation={animation}
    >
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  );
};

export default Loading;
