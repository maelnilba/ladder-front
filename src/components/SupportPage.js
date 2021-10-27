import {
  Flex,
  Box,
  Stack,
  Text,
  Tag,
  useColorMode,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  useToast,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";
import { useStatus, useStatusLog } from "../utils/useStatus";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";

export function SupportPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [page, setPage] = useState("informations");
  const isDark = colorMode === "dark";

  const [isLargerThan720] = useMediaQuery(720);
  const [loading, code, message, description] = useStatus();

  return (
    <Flex
      direction={isLargerThan720 ? "row" : "column"}
      justifyContent="space-around"
    >
      <Box m={5} p={5}>
        <Stack direction="column" spacing={5}>
          <Button
            isFullWidth
            bgColor={isDark ? "gray.800" : "gray.200"}
            onClick={() => setPage("informations")}
          >
            Informations
          </Button>
          <Button
            isFullWidth
            bgColor={isDark ? "gray.800" : "gray.200"}
            onClick={() => setPage("problems")}
          >
            Problèmes récurrents
          </Button>
          <Button
            isFullWidth
            bgColor={isDark ? "gray.800" : "gray.200"}
            onClick={() => setPage("contact")}
          >
            Contact
          </Button>
          <Link
            href="https://southern-voyage-58e.notion.site/Changelog-c30c9f5536f44d0594a25df130aa7bd2"
            isExternal
          >
            <Button isFullWidth bgColor={isDark ? "gray.800" : "gray.200"}>
              Changelog
            </Button>
          </Link>
          {!loading && <LogButton code={code} message={message} />}
        </Stack>
      </Box>
      {page == "informations" && <InformationPage />}
      {page == "problems" && <ProblemPage />}
      {page == "contact" && <ContactPage />}
    </Flex>
  );
}

const getLedColor = (code) => {
  if (code == 200) {
    return "🟡 Actif";
  } else if (code == 404) {
    return "🔴 Inactif";
  } else if (code == 400) {
    return "🟠 Perturbations";
  } else if (code == 101) {
    return "🟣 Maintenance";
  } else if (code == 102) {
    return "⚪️";
  }
};

const LogButton = ({ code, message }) => {
  const led = getLedColor(code);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDark = colorMode === "dark";
  const [loading, logs] = useStatusLog();
  console.log(logs);
  return (
    <>
      <Button
        isFullWidth
        bgColor={isDark ? "gray.800" : "gray.200"}
        onClick={onOpen}
      >
        {led}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="gray">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={isDark ? "gray.200" : "gray.800"}>
            Derniers logs
          </ModalHeader>
          <ModalCloseButton color={isDark ? "gray.200" : "gray.800"} />
          {!loading && (
            <ModalBody color={isDark ? "gray.200" : "gray.800"}>
              <span>
                {logs.map((log, i) => (
                  <LogTag key={i} log={log} />
                ))}
              </span>
            </ModalBody>
          )}
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const LogTag = ({ log }) => {
  const { created_at, code, message, description } = log;
  return (
    <Stack direction="row" spacing={1}>
      <Tag>{created_at}</Tag>
      <Text>{code}</Text>
      <Text>{message}</Text>
      <Text>{description}</Text>
    </Stack>
  );
};

const InformationPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Stack
      bgColor={isDark ? "gray.800" : "gray.200"}
      m={5}
      p={5}
      spacing={4}
      borderRadius={15}
      maxWidth="920px"
      direction="column"
    >
      <Text textAlign="justify">
        Certains fonctionnement du ladder ne sont pas toutes intuitives et
        peuvent être confondu avec des bugs, voir la liste ci dessous :
      </Text>
      <Text textAlign="justify">
        • Certain match ne sont pas récupérable en heure pleine, çela est
        aléatoire et inévitable.
      </Text>
      <Text textAlign="justify">
        • Les combats de 3V3 équipe sont mélangés avec ceux de 3V3 solo. Aucune
        distinction direct n'est possible entre eux, des solutions sont en
        reflexions.
      </Text>
      <Text textAlign="justify">
        • Les pseudos avec un alphabet cyrillique ne fonctionne pas. Une
        solution sera bientôt mise en test.
      </Text>
      <Text textAlign="justify">
        • Les personnages avec un niveau inférieur à 200 ne sont pas prit en
        compte pour la récupération de cote et de serveur. Il s'agit d'un test
        pour vérifier l'impact sur les performences du au nombre élévés de
        combat 1V1 199 contre 199. Cela pourra changer dans les mises à jours à
        suivre selon l'analyse des performences.
      </Text>
      <Text textAlign="justify">
        • Les côtes des personnages peuvent rencontrer un problème de
        synchronisation. Si un problème survient lors du processus vôtre côte
        n'est pas actualisé. La correction des bugs futurs est censé atteinué la
        fréquence du problème.
      </Text>
      <Text textAlign="justify">
        • Le résultat des victoires et défaites se base sur les côtes des
        matchs. Si un problème est présent dans les informations du match cela
        se répercute sur le résultat.
      </Text>
    </Stack>
  );
};

const ContactPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const toast = useToast();
  const handleClipboard = () => {
    navigator.clipboard.writeText("Nib#5952");
    toast({
      title: "Copié !",
      description: "Copié dans votre clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <Stack
      bgColor={isDark ? "gray.800" : "gray.200"}
      m={5}
      p={5}
      spacing={4}
      borderRadius={15}
      maxWidth="920px"
      direction="column"
    >
      <Text textAlign="justify">
        Pour l'explication et l'aide d'une résolution à un problème, le
        signalement d'un bug présent sur le site, ou autres, vous pouvez me
        contacter par les moyens suivants :
      </Text>
      <Flex direction="row" align="center">
        <Text fontWeight={600}> Sur Discord</Text>
        <Button
          leftIcon={
            <Image
              borderRadius="full"
              boxSize="32px"
              src="../assets/profilnib.jpg"
              alt="Nib"
            />
          }
          ml={2}
          size="md"
          colorScheme="gray"
          variant="solid"
          onClick={() => handleClipboard()}
        >
          Nib#5952
        </Button>
        <Link isExternal href="https://twitter.com/nibounet">
          <Button ml={2} colorScheme="twitter" leftIcon={<FaTwitter />}>
            Twitter
          </Button>
        </Link>
      </Flex>
    </Stack>
  );
};

const ProblemPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Stack
      bgColor={isDark ? "gray.800" : "gray.200"}
      m={5}
      p={5}
      spacing={4}
      borderRadius={15}
      maxWidth="920px"
      direction="column"
    >
      <Text textAlign="justify">
        Le fonctionnement du site nécessite l'utilisation d'un client Dofus, par
        conséquent chacun élement lié à celui-ci ne peut être totalement évité.
        Cependant certaines complications peuvent être résolues par vous.
      </Text>
      <Text textAlign="justify">
        Vous pouvez retrouver ci-dessous une liste des problèmes récurrents
        ainsi qu'une aide à leur résolution :
      </Text>
      <Accordion colorScheme="gray" allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Je ne trouve pas mon personnage via la recherche
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text textAlign="justify">
              Si vous n'arrivez pas à trouver via les options de recherche,
              essayer d'accéder à la page players/[id] directement via l'URL,
              l'id étant le numéro présent sur votre page perso. Les pseudos
              utilisant l'alphabet russe ne sont pas directement récupérables.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Mon personnage n'est pas référencé
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text textAlign="justify">
              Lancer un nouveau combat de KIS, si cela ne fonctionne pas,
              vérifier que vous avez cocher "Afficher le Ladder" sur votre page
              perso Dofus.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Ma cote 3V3 est à 0
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text textAlign="justify">
              La récupération de la cote n'est pas possible si vous êtes encore
              en combats de placement. Si le problème persiste, vérifier que
              vous avez cocher "Afficher le Ladder" sur votre page perso Dofus.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Ma cote 1V1 est à 0
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text textAlign="justify">
              Vérifier que vous avez cocher "Afficher le Ladder" sur votre page
              perso Dofus.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Mon personnage est présent plusieurs fois
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text textAlign="justify">
              Lors d'un changement de serveur, le jeu supprime et recréer un
              nouveau personnage, avec un nouveau id, votre personnage sera
              alors présent le nombre de fois égal à un changement de serveur.
              Si vous voulez supprimer votre ancien personnage, utiliser un
              moyen de contact.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};
