import { useContext } from "react";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  useColorMode,
  Link,
  Button,
} from "@chakra-ui/react";
import { ctx } from "./context/Provider";
import { BannerKoli } from "./BannerKoli";

export function KoliTypeTabs(props) {
  const { typeK, changeK } = useContext(ctx);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Tabs
      onChange={(index) => changeK(index)}
      variant="soft-rounded"
      colorscheme="gray"
      mb={4}
    >
      <TabList>
        <Tab>⚔️ 3V3</Tab>
        <Tab>⚔️ 1V1</Tab>
        <Box ml={10}>
          <Link href="/latests">
            <Button bgColor={isDark ? "gray.800" : "gray.200"}>
              Derniers matchs
            </Button>
          </Link>
        </Box>
      </TabList>
      <TabPanels>
        <TabPanel>
          <BannerKoli type={1} />
        </TabPanel>
        <TabPanel>
          <BannerKoli type={3} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
