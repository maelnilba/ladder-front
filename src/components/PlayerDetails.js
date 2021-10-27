import {
  Box,
  Image,
  Flex,
  Heading,
  useColorMode,
  Badge,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import { useMediaQuery } from "../utils/useMediaQuery";
import { breeds } from "../utils/breedsIndex";
import { useFetchPlayer } from "../utils/useFetchPlayer";
import { useFetchCountMatch } from "../utils/useFetchCountMatch";

export function PlayerDetails({ uid }) {
  const [loading, payload] = useFetchPlayer(uid);
  const [count_loading, count] = useFetchCountMatch(uid);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { cote_1v1, cote_3v3, pseudo, classe, level, id, serveur } = payload;
  const [isLargerThan1080] = useMediaQuery(1080);

  if (isLargerThan1080) {
    return (
      <Box width="425px">
        {loading && (
          <Flex
            height="500px"
            bgColor={isDark ? "gray.800" : "gray.100"}
            borderRadius={15}
          >
            <Skeleton
              startColor="pink.500"
              endColor="orange.500"
              height="10px"
              borderRadius={15}
              width="100%"
            />
          </Flex>
        )}
        {!loading && pseudo && classe && (
          <Flex
            bgColor={isDark ? "gray.800" : "gray.200"}
            borderRadius={15}
            p={2}
          >
            <Head>
              <title>KIS - {pseudo}</title>
            </Head>
            <Box>
              <Image
                src={`../assets/breeds/${classe}.jpg`}
                alt={breeds[classe - 1]}
                borderRadius={15}
              />
              <Box p={4}>
                <Heading size="lg">{pseudo?.toUpperCase()}</Heading>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {serveur}
                </Badge>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {breeds[classe - 1][0].toUpperCase() +
                    breeds[classe - 1].slice(1)}{" "}
                </Badge>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {level}
                </Badge>
              </Box>
              <Table size="lg" variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th> ⚔️ Mode de jeu</Th>
                    <Th> Elo</Th>
                    <Th isNumeric> 📊 Matchs joués</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>3V3</Td>
                    <Td>{cote_3v3}</Td>
                    <Td isNumeric>{!count_loading ? count[0] : 0}</Td>
                  </Tr>
                  <Tr>
                    <Td>1V1</Td>
                    <Td>{cote_1v1}</Td>
                    <Td isNumeric>{!count_loading ? count[1] : 0}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box p={4}>
                <Link
                  href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${id}-${pseudo}`}
                  isExternal
                >
                  <Button
                    leftIcon={
                      <Image
                        src="../assets/dofusicon.svg"
                        height={30}
                        width={30}
                      />
                    }
                    bgColor="#98ac04"
                    variant="solid"
                    isFullWidth
                  >
                    Page perso
                  </Button>
                </Link>
              </Box>
            </Box>
          </Flex>
        )}
      </Box>
    );
  } else {
    return (
      <Box>
        {loading && (
          <Flex
            height="500px"
            bgColor={isDark ? "gray.800" : "gray.100"}
            borderRadius={15}
          >
            <Skeleton
              startColor="pink.500"
              endColor="orange.500"
              height="10px"
              borderRadius={15}
              width="100%"
            />
          </Flex>
        )}
        {!loading && pseudo && classe && (
          <Flex
            bgColor={isDark ? "gray.800" : "gray.200"}
            borderRadius={15}
            p={2}
          >
            <Box>
              <Image
                src={`../assets/breeds/${classe}.jpg`}
                alt={breeds[classe - 1]}
                borderRadius={15}
              />
              <Box p={4}>
                <Heading size="lg">{pseudo?.toUpperCase()}</Heading>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {serveur}
                </Badge>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {breeds[classe - 1][0].toUpperCase() +
                    breeds[classe - 1].slice(1)}{" "}
                </Badge>
                <Badge ml="1" fontSize="0.8em" colorScheme="gray">
                  {level}
                </Badge>
              </Box>
              <Table size="sm" variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th> ⚔️ Mode de jeu</Th>
                    <Th> Elo</Th>
                    <Th isNumeric> 📊 Matchs joués</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>3V3</Td>
                    <Td>{cote_3v3}</Td>
                    <Td isNumeric>{!count_loading ? count[0] : 0}</Td>
                  </Tr>
                  <Tr>
                    <Td>1V1</Td>
                    <Td>{cote_1v1}</Td>
                    <Td isNumeric>{!count_loading ? count[1] : 0}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box p={4}>
                <Link
                  href={`https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/${id}-${pseudo}`}
                  isExternal
                >
                  <Button
                    leftIcon={
                      <Image
                        src="../assets/dofusicon.svg"
                        height={30}
                        width={30}
                      />
                    }
                    bgColor="#98ac04"
                    variant="solid"
                    isFullWidth
                  >
                    Page perso
                  </Button>
                </Link>
              </Box>
            </Box>
          </Flex>
        )}
      </Box>
    );
  }
}
