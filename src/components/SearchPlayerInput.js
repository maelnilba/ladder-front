import { useRef, useState, useEffect } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverCloseButton,
  useColorMode,
  PopoverBody,
  Image,
  Button,
  Flex,
  Stack,
  Skeleton,
  Tag,
  Link,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { breeds } from "../utils/breedsIndex";
import { useFetchPlayerByPseudo } from "../utils/useFetchPlayerByPseudo";
import { useDebounce } from "../utils/useDebounce";

export function SearchPlayerInput({ path }) {
  const initialFocusRef = useRef();
  const [loading, payload, setPseudo] = useFetchPlayerByPseudo("");
  const [inputPseudo, setinputPseudo] = useState(false);
  const [debouncedPseudo] = useDebounce(inputPseudo, 250);
  useEffect(() => {
    setPseudo(debouncedPseudo);
  }, [debouncedPseudo]);

  return (
    <Box>
      <Popover
        initialFocusRef={initialFocusRef}
        colorScheme="gray"
        closeOnEsc={true}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon colorscheme="gray" />}
            />
            <Input
              placeholder="Rechercher un joueur"
              ref={initialFocusRef}
              onChange={(e) => setinputPseudo(e.target.value)}
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverBody mt={5}>
            {loading && (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
            {!loading &&
              payload.map(({ id, pseudo, classe, level, serveur }, i) => (
                <PreviewPlayerLine
                  key={i}
                  infos={{ id, pseudo, classe, level, serveur }}
                  path={path}
                />
              ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

const PreviewPlayerLine = ({ infos, path }) => {
  const { id, pseudo, classe, level, serveur } = infos;
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const imgPath = path == "/" ? "./" : "../";
  return (
    <Stack
      direction="row"
      spacing={4}
      my={2}
      align="center"
      justify="space-between"
    >
      <Box minWidth="40px" boxSize="40px">
        <Image
          src={`${imgPath}breedshead/${breeds[classe - 1]}.jpg`}
          alt={pseudo}
        />
      </Box>
      <Box minWidth="120px">
        <Link href={`/players/${id}`}>
          <Text fontWeight={600}>{pseudo}</Text>
        </Link>
      </Box>
      <Box width="80px">
        <Tag>{serveur}</Tag>
      </Box>
    </Stack>
  );
};
