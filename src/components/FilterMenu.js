import { useState, useContext } from "react";
import {
  Flex,
  Wrap,
  WrapItem,
  Box,
  Image,
  Tooltip,
  FormControl,
  FormLabel,
  IconButton,
  Center,
  useColorMode,
  InputGroup,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";

import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import { breeds } from "../utils/breedsIndex";
import { ctx } from "./context/Provider";

export function FilterMenu(props) {
  const [isLargerThan780] = useMediaQuery(780);
  const servers = [
    {
      label: "Tous",
      value: "All",
    },
    {
      label: "Ush",
      value: "Ush",
    },
    {
      label: "Agride",
      value: "Agride",
    },
    {
      label: "Ilyzaelle",
      value: "Ilyzaelle",
    },
    {
      label: "Nidas",
      value: "Nidas",
    },
    {
      label: "Pandore",
      value: "Pandore",
    },
    {
      label: "Atcham",
      value: "Atcham",
    },
    {
      label: "Brumen",
      value: "Brumen",
    },
    {
      label: "Crocabulia",
      value: "Crocabulia",
    },
    {
      label: "Echo",
      value: "Echo",
    },
    {
      label: "Jahash",
      value: "Jahash",
    },
    {
      label: "Julith",
      value: "Julith",
    },
    {
      label: "Furye",
      value: "Furye",
    },
    {
      label: "Meriana",
      value: "Meriana",
    },
    {
      label: "Merkator",
      value: "Merkator",
    },
    {
      label: "Rubilax",
      value: "Rubilax",
    },
  ];

  const handleBreed = (v) => {
    setBreed(v);
    changebK(v);
  };
  const [breed, setBreed] = useState();
  const [pseudo, setPseudo] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const { changebK, changesK, changelK, changepK } = useContext(ctx);

  if (isLargerThan780) {
    return (
      <Flex maxWidth="300px" mb="100px" direction="column">
        <Wrap p={2}>
          {breeds.map((item, i) => {
            return (
              <WrapItem key={i}>
                <Tooltip
                  hasArrow
                  openDelay={500}
                  label={item[0].toUpperCase() + item.slice(1)}
                  colorscheme="gray"
                >
                  <Box boxSize="65px">
                    <Image
                      onClick={(e) => handleBreed(i)}
                      src={`./breedshead/${item}.jpg`}
                      _hover={{
                        opacity: 0.8,
                      }}
                      alt={item}
                      border={i === breed ? "4px" : "0px"}
                      borderColor={isDark ? "gray.50" : "gray.900"}
                    />
                  </Box>
                </Tooltip>
              </WrapItem>
            );
          })}
          <Center>
            <IconButton
              margin="8px"
              fontSize="24px"
              colorscheme="red"
              aria-label="Call Segun"
              size="lg"
              icon={<DeleteIcon />}
              onClick={() => handleBreed("all")}
            />
          </Center>
        </Wrap>
        <FormControl p={2}>
          <FormLabel>Serveurs</FormLabel>
          <Select
            colorscheme="gray"
            tagVariant="outline"
            selectedOptionStyle="check"
            defaultValue={{ label: "Tous", value: "All" }}
            options={servers}
            placeholder="Serveurs"
            onChange={({ value }) => changesK(value)}
          />
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Niveau</FormLabel>
          <NumberInput
            defaultValue={200}
            max={200}
            min={20}
            onChange={(value) => changelK(value)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <Stack direction="row" spacing={4} p={2}>
          <InputGroup>
            <Input
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </InputGroup>
          <IconButton
            colorscheme="gray"
            aria-label="Pseudo"
            icon={<SearchIcon />}
            onClick={() => changepK(pseudo)}
          />
        </Stack>
      </Flex>
    );
  } else {
    return (
      <Accordion allowToggle mb={5}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontWeight={400}>Filtres</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex direction="column" my={10} justify="center">
              <Wrap p={1}>
                {breeds.map((item, i) => {
                  return (
                    <WrapItem key={i}>
                      <Tooltip
                        hasArrow
                        openDelay={500}
                        label={item[0].toUpperCase() + item.slice(1)}
                        colorscheme="gray"
                      >
                        <Box boxSize="48px">
                          <Image
                            onClick={(e) => handleBreed(i)}
                            src={`./breedshead/${item}.jpg`}
                            _hover={{
                              opacity: 0.8,
                            }}
                            alt={item}
                            border={i === breed ? "4px" : "0px"}
                            borderColor={isDark ? "gray.50" : "gray.900"}
                          />
                        </Box>
                      </Tooltip>
                    </WrapItem>
                  );
                })}
                <Center>
                  <IconButton
                    margin="8px"
                    fontSize="24px"
                    colorscheme="red"
                    aria-label="Call Segun"
                    size="md"
                    icon={<DeleteIcon />}
                    onClick={() => handleBreed("all")}
                  />
                </Center>
              </Wrap>
              <Wrap align="center" justify="center">
                <WrapItem minWidth="240px">
                  <FormControl p={2}>
                    <FormLabel>Serveurs</FormLabel>
                    <Select
                      colorscheme="gray"
                      selectedOptionStyle="check"
                      defaultValue={{ label: "Tous", value: "All" }}
                      options={servers}
                      placeholder="Serveurs"
                      onChange={({ value }) => changesK(value)}
                    />
                  </FormControl>
                </WrapItem>
                <WrapItem maxWidth="100px">
                  <FormControl p={2}>
                    <FormLabel>Niveau</FormLabel>
                    <NumberInput
                      defaultValue={200}
                      max={200}
                      min={20}
                      onChange={(value) => changelK(value)}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                </WrapItem>
                <WrapItem>
                  <Stack
                    direction="row"
                    spacing={4}
                    p={2}
                    justify="center"
                    mt={7}
                  >
                    <InputGroup>
                      <Input
                        placeholder="Pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                      />
                    </InputGroup>
                    <IconButton
                      colorscheme="gray"
                      aria-label="Pseudo"
                      icon={<SearchIcon />}
                      onClick={() => changepK(pseudo)}
                    />
                  </Stack>
                </WrapItem>
              </Wrap>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
