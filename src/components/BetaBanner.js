import {
  Center,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export function BetaBanner() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { pathname } = useRouter();
  if (pathname == "/") {
    return (
      <Center mb={10}>
        <Stack
          bgColor={isDark ? "gray.800" : "gray.100"}
          p={4}
          borderRadius={15}
        >
          <Heading size="lg">⚠️ Bêta-test</Heading>
          <Text>
            Toutes informations disponible sur la{" "}
            <Link href="/support" fontWeight={600}>
              page support
            </Link>
          </Text>
        </Stack>
      </Center>
    );
  } else {
    return <Center mb={10}></Center>;
  }
}
