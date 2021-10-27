import { Center, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Center mt={20} mb={4} px={2}>
      <Text textAlign="justify">
        © 2021 KIS Ladder. Certaines illustrations sont la propriété d'Ankama
        Studio et de Dofus - Tous droits réservés.
      </Text>
    </Center>
  );
}
