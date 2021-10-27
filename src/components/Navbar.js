import {
  Flex,
  Heading,
  Stack,
  Button,
  Box,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useColorMode,
  Link,
  Icon,
} from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";

import { useRouter } from "next/router";
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { SearchPlayerInput } from "./SearchPlayerInput";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Navbar = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useRouter();
  const [isLargerThan780] = useMediaQuery(780);

  if (isLargerThan780) {
    return (
      <Stack
        width="100%"
        p={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb="40px"
      >
        <Stack direction="row" spacing={8}>
          <Box>
            <Heading size="lg">⚔️ KIS LADDER</Heading>
          </Box>
          <Link href="/">
            <Button colorscheme="gray" variant="ghost">
              Classement
            </Button>
          </Link>
          <SearchPlayerInput path={pathname} />
        </Stack>
        <Stack direction="row" spacing={8}>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Icon as={SettingsIcon} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                Mode clair/sombre <DarkModeSwitch />
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack
        width="100%"
        p={2}
        direction="row"
        align="center"
        justifyContent="space-between"
        mb="40px"
      >
        <Stack direction="row" spacing={8} align="center">
          <Box>
            <Link href="/">
              <Heading size="lg">⚔️</Heading>
            </Link>
          </Box>
          <SearchPlayerInput path={pathname} />
          {/* <Link href="/">
            <Button colorscheme="gray" variant="ghost">
              Classement
            </Button>
          </Link> */}
        </Stack>
        <Stack direction="row" spacing={8}>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Icon as={SettingsIcon} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                Mode clair/sombre <DarkModeSwitch />
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
    );
  }
};
