import { Flex, useColorMode } from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";
import { useRouter } from "next/router";

export const Body = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };
  const { pathname } = useRouter();
  const color = { light: "black", dark: "white" };
  const [isLargerThan1080] = useMediaQuery(1080);
  const [isLargerThan760] = useMediaQuery(760);
  const [isLargerThan540] = useMediaQuery(540);
  const bodyWidth = isLargerThan1080
    ? "90%"
    : !isLargerThan540
    ? pathname == "/"
      ? "95%"
      : "100%"
    : "95%";
  return (
    <Flex
      maxWidth="1620px"
      direction="column"
      width={bodyWidth}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
    >
      {children}
    </Flex>
  );
};
