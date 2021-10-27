import {
  Stack,
  Flex,
  Skeleton,
  Text,
  Heading,
  Spacer,
  Box,
  Image,
  Link,
  useColorMode,
  Tag,
  Center,
} from "@chakra-ui/react";
import { useFetchLastMatchs } from "../utils/useFetchLastMatchs";
import { useMediaQuery } from "../utils/useMediaQuery";
import { breeds } from "../utils/breedsIndex";

export function LatestsContainer() {
  const [loading, list] = useFetchLastMatchs();
  const [isLargerThan1080] = useMediaQuery(1080);

  return (
    <Center p={4}>
      <Flex maxWidth={isLargerThan1080 ? "800px" : "100%"}>
        {loading && (
          <Stack
            direction="column"
            spacing={4}
            width={isLargerThan1080 ? "800px" : "100%"}
            minWidth="200px"
          >
            <Skeleton height="160px" borderRadius={10} p={5} boxShadow="xl" />
            <Skeleton height="160px" borderRadius={10} p={5} boxShadow="xl" />
            <Skeleton height="160px" borderRadius={10} p={5} boxShadow="xl" />
            <Skeleton height="160px" borderRadius={10} p={5} boxShadow="xl" />
          </Stack>
        )}
        {!loading && (
          <span>
            {list.map(({ nplayers: item, duration }, index) => (
              <>
                <TimerTag timer={new Date(item[1])} />
                <MatchCard
                  key={index}
                  type={item[0]}
                  match={item.slice(2, item.length)}
                  duration={duration}
                />
              </>
            ))}
          </span>
        )}
      </Flex>
    </Center>
  );
}

const TimerTag = ({ timer }) => {
  const time = `${timer.getHours()} : ${timer.getMinutes()} : ${timer.getSeconds()}`;
  return (
    <Center>
      <Tag>{time}</Tag>
    </Center>
  );
};
const MatchCard = ({ match, type, duration }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const nplayers = match;
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
