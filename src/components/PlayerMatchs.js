import { useState } from "react";
import {
  Text,
  Flex,
  Box,
  Tabs,
  TabList,
  Tab,
  Stack,
  useColorMode,
  Image,
  Heading,
  Tag,
  Skeleton,
  Link,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";
import { useFetchMatch1v1, useFetchMatch3v3 } from "../utils/useFetchMatch";
import { breeds } from "../utils/breedsIndex";
import { PaginationButton } from "./PaginationButton";

export function PlayerMatchs({ uid }) {
  const [pagination, setPagination] = useState([1, 1]);
  const [loading1, list1v1, hasMore1, setPage1] = useFetchMatch1v1(
    uid,
    pagination[1]
  );
  const [loading3, list3v3, hasMore3, setPage2] = useFetchMatch3v3(
    uid,
    pagination[0]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const handlePage1 = (action) => {
    if (action == "inc") {
      setPage1(pagination[1] + 1);
      setPagination([pagination[0], pagination[1] + 1]);
    } else if (action == "dec") {
      if (pagination[1] > 1) {
        setPage1(pagination[1] - 1);
        setPagination([pagination[0], pagination[1] - 1]);
      }
    }
  };

  const handlePage3 = (action) => {
    if (action == "inc") {
      setPage2(pagination[0] + 1);
      setPagination([pagination[0] + 1, pagination[1]]);
    } else if (action == "dec") {
      if (pagination[0] > 1) {
        setPage2(pagination[0] - 1);
        setPagination([pagination[0] - 1, pagination[1]]);
      }
    }
  };

  const [isLargerThan1080] = useMediaQuery(1080);

  return (
    <Box
      p={2}
      ml={isLargerThan1080 ? 10 : 0}
      width={isLargerThan1080 ? "800px" : ""}
    >
      <Tabs
        defaultIndex={0}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>3V3</Tab>
          <Tab>1V1</Tab>
        </TabList>
      </Tabs>
      {(loading1 || loading3) && (
        <Stack mt={5}>
          {Array.from(new Array(Math.floor(Math.random() * 4) + 1)).map(
            (v, i) => (
              <Skeleton
                key={"keyskeleton" + i}
                height="160px"
                borderRadius={10}
                p={5}
                boxShadow="xl"
              />
            )
          )}
        </Stack>
      )}
      {!loading1 && !loading3 && (
        <>
          {!loading3 && list3v3 && tabIndex == 0 && (
            <span>
              {list3v3.map((item, index) => (
                <MatchCard key={index} match={item} type={1} />
              ))}
              {list3v3.length > 0 ? (
                <Center>
                  <PaginationButton
                    page={pagination[0]}
                    hasMore={hasMore3}
                    handleClick={handlePage3}
                  />
                </Center>
              ) : (
                <NoMatchCard type={1} />
              )}
            </span>
          )}

          {!loading1 && list1v1 && tabIndex == 1 && (
            <span>
              {list1v1.map((item, index) => (
                <MatchCard key={index} match={item} type={3} />
              ))}
              {list1v1.length > 0 ? (
                <Center>
                  <PaginationButton
                    page={pagination[1]}
                    hasMore={hasMore1}
                    handleClick={handlePage1}
                  />
                </Center>
              ) : (
                <NoMatchCard type={3} />
              )}
            </span>
          )}
        </>
      )}
    </Box>
  );
}

const NoMatchCard = ({ type }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-around"
      bgColor={isDark ? "gray.800" : "gray.200"}
      borderRadius={10}
      p={5}
      my={5}
      boxShadow="xl"
    >
      <Heading size="md" fontWeight={400}>
        Aucun match ⚔️ {type == 1 ? "3V3" : "1V1"} joué
      </Heading>
    </Flex>
  );
};

export const MatchCard = ({ match, type }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { nplayers, result, duration } = match;
  console.log(match, type);

  if (type == 1) {
    return (
      <Flex
        direction="row"
        align="center"
        bgColor={isDark ? "gray.800" : "gray.200"}
        borderRadius={10}
        p={5}
        my={5}
        boxShadow="xl"
      >
        <Stack direction="column" spacing={4} minWidth="33%">
          <PlayerInfo infos={nplayers[0]} />
          <PlayerInfo infos={nplayers[1]} />
          <PlayerInfo infos={nplayers[2]} />
        </Stack>
        <Spacer />
        <Stack direction="column" spacing={4} jusitfy="center" mx={2}>
          {duration !== null && (
            <Tag size="lg" colorScheme="gray">
              {duration}
            </Tag>
          )}
          <Heading size="3xl" textAlign="center">
            ⚔️
          </Heading>
          {!(result == -1) && (
            <Tag size="lg" colorScheme={result == 0 ? "red" : "green"}>
              {result == 0 ? "DEFAITE" : "VICTOIRE"}
            </Tag>
          )}
        </Stack>
        <Spacer />
        <Stack direction="column" spacing={4} minWidth="33%">
          <PlayerInfo infos={nplayers[3]} />
          <PlayerInfo infos={nplayers[4]} />
          <PlayerInfo infos={nplayers[5]} />
        </Stack>
      </Flex>
    );
  } else {
    return (
      <Flex
        direction="row"
        align="center"
        bgColor={isDark ? "gray.800" : "gray.200"}
        borderRadius={10}
        p={5}
        my={5}
        boxShadow="xl"
      >
        <Stack direction="column" spacing={4} minWidth="33%">
          <PlayerInfo infos={nplayers[0]} />
        </Stack>
        <Spacer />
        <Stack direction="column" spacing={4} align="center" mx={2}>
          {duration !== null && (
            <Tag size="lg" colorScheme="gray">
              {duration}
            </Tag>
          )}
          <Heading size="3xl" textAlign="center">
            ⚔️
          </Heading>
          {!(result == -1) && (
            <Tag size="lg" colorScheme={result == 0 ? "red" : "green"}>
              {result == 0 ? "DEFAITE" : "VICTOIRE"}
            </Tag>
          )}
        </Stack>
        <Spacer />
        <Stack direction="column" spacing={4} minWidth="33%">
          <PlayerInfo infos={nplayers[1]} />
        </Stack>
      </Flex>
    );
  }
};

const PlayerInfo = ({ infos }) => {
  const { id, pseudo, classe, cote } = infos;
  const [isLargerThan760] = useMediaQuery(760);
  const [isLargerThan540] = useMediaQuery(540);

  if (isLargerThan540) {
    return (
      <Stack
        direction="row"
        spacing={2}
        align="center"
        minWidth={isLargerThan760 ? "200px" : "100px"}
      >
        <Box boxSize="36px">
          <Image
            src={`../breedshead/${breeds[classe - 1]}.jpg`}
            alt={breeds[classe - 1]}
            borderRadius={15}
          />
        </Box>
        <Link href={`/players/${id}`}>
          <Heading size="sm" fontWeight={600}>
            {pseudo}
          </Heading>
        </Link>
        {cote < 20 ? <Box></Box> : <Tag colorScheme="gray">{cote}</Tag>}
      </Stack>
    );
  } else {
    return (
      <Stack direction="column" spacing={2} align="center" minWidth="100px">
        <Box boxSize="36px">
          <Image
            src={`../breedshead/${breeds[classe - 1]}.jpg`}
            alt={breeds[classe - 1]}
            borderRadius={15}
          />
        </Box>
        <Link href={`/players/${id}`}>
          <Heading size="xs" fontWeight={600} align="center">
            {pseudo}
          </Heading>
        </Link>
        {cote < 20 ? <Box></Box> : <Tag colorScheme="gray">{cote}</Tag>}
      </Stack>
    );
  }
};
