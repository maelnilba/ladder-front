import { useEffect, useContext } from "react";
import {
  Flex,
  Stack,
  Text,
  Box,
  Image,
  Spinner,
  useColorMode,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";
import { ctx } from "./context/Provider";
import { breeds } from "../utils/breedsIndex";
import { useFetchRank } from "../utils/useFetchRank";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export function RankingList(props) {
  const { typeK, breedK, serverK, levelK, pseudoK, orderK } = useContext(ctx);
  const [loading, list, reFetch] = useFetchRank({ typeK, breedK, orderK });

  useEffect(() => {
    reFetch({ typeK, breedK, serverK, levelK, pseudoK, orderK });
  }, [typeK, breedK, serverK, levelK, pseudoK, orderK]);
  return (
    <Box width="100%">
      <Stack direction="column" spacing={2} p={4}>
        {loading && (
          <Flex width="100%" align="center" justify="center" mt="200px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        )}
        <span>
          {!loading && list && (
            <span>
              <RankHead selectPseudo={pseudoK} />
              {list.map((v, i) => (
                <RankLine key={i} player={v} rank={i}></RankLine>
              ))}
            </span>
          )}
        </span>
      </Stack>
    </Box>
  );
}

const RankHead = ({ selectPseudo }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [isLargerThan1080] = useMediaQuery(1080);
  const { orderK, changeoK } = useContext(ctx);
  if (isLargerThan1080) {
    return (
      <Flex
        direction="row"
        justify="space-around"
        align="center"
        my={5}
        bgColor={isDark ? "gray.800" : "gray.100"}
        borderRadius={5}
      >
        <Box width="40px">
          <Text align="center" fontWeight={600}>
            {selectPseudo ? "" : "Rang"}
          </Text>
        </Box>
        <Box boxSize="40px"></Box>
        <Box width="180px">
          <Text fontWeight={600}>Pseudo</Text>
        </Box>
        <Box width="120px">
          <Text align="center" fontWeight={600}>
            Serveur
          </Text>
        </Box>
        <Box width="140px">
          <Text align="center" fontWeight={600}>
            Classe
          </Text>
        </Box>
        <Box width="80px">
          <Text align="center" fontWeight={600}>
            Niveau
          </Text>
        </Box>
        <Box width="80px" fontWeight={600}>
          <Text>
            Cote{" "}
            <IconButton
              aria-label="Search database"
              icon={orderK === "desc" ? <ChevronDownIcon /> : <ChevronUpIcon />}
              size="xs"
              onClick={() => changeoK()}
            />
          </Text>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex
        direction="row"
        justify="space-around"
        align="center"
        my={2}
        bgColor={isDark ? "gray.800" : "gray.100"}
        borderRadius={5}
      >
        <Box width="40px">
          <Text align="center" fontWeight={600}>
            {selectPseudo ? "" : "Rang"}
          </Text>
        </Box>
        <Box boxSize="40px"></Box>
        <Box width="120px">
          <Text fontWeight={600}>Pseudo</Text>
        </Box>
        <Box width="80px" fontWeight={600}>
          <Text>Cote</Text>
        </Box>
      </Flex>
    );
  }
};

const RankLine = ({ player, rank }) => {
  const { typeK } = useContext(ctx);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [isLargerThan1080] = useMediaQuery(1080);
  if (isLargerThan1080) {
    return (
      <Flex
        direction="row"
        justify="space-around"
        align="center"
        my={5}
        bgColor={
          isDark
            ? rank % 2 == 0
              ? "gray.800"
              : "gray.700"
            : rank % 2 == 0
            ? "gray.100"
            : "gray.200"
        }
        borderRadius={5}
      >
        <Box width="40px">
          <Text align="center">{rank + 1}</Text>
        </Box>
        <Box boxSize="40px">
          <Image
            src={`./breedshead/${breeds[player.classe - 1]}.jpg`}
            alt={player.pseudo}
          />
        </Box>
        <Box width="180px">
          <Link href={`/players/${player.id}`}>
            <Text fontWeight={600}>{player.pseudo}</Text>
          </Link>
        </Box>
        <Box width="120px">
          <Text align="center">{player.serveur}</Text>
        </Box>
        <Box width="140px">
          <Text align="center">
            {breeds[player.classe - 1].charAt(0).toUpperCase() +
              breeds[player.classe - 1].slice(1)}
          </Text>
        </Box>
        <Box width="80px">
          <Text align="center">{player.level}</Text>
        </Box>
        <Box width="80px">
          <Text>{typeK == 0 ? player.cote_3v3 : player.cote_1v1}</Text>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex
      direction="row"
      justify="space-around"
      align="center"
      my={2}
      bgColor={
        isDark
          ? rank % 2 == 0
            ? "gray.800"
            : "gray.700"
          : rank % 2 == 0
          ? "gray.100"
          : "gray.200"
      }
      borderRadius={5}
    >
      <Box width="40px">
        <Text align="center">{rank + 1}</Text>
      </Box>
      <Box boxSize="40px">
        <Image
          src={`./breedshead/${breeds[player.classe - 1]}.jpg`}
          alt={player.pseudo}
        />
      </Box>
      <Box width="120px">
        <Link href={`/players/${player.id}`}>
          <Text fontWeight={600}>{player.pseudo}</Text>
        </Link>
      </Box>
      <Box width="80px">
        <Text>{typeK == 0 ? player.cote_3v3 : player.cote_1v1}</Text>
      </Box>
    </Flex>
  );
};
