import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "../../utils/useMediaQuery";
import Head from "next/head";
import { PlayerDetails } from "../../components/PlayerDetails";
import { PlayerMatchs } from "../../components/PlayerMatchs";
function Player(props) {
  const {
    query: { id },
  } = useRouter();
  const [isLargerThan1080] = useMediaQuery(1080);
  return (
    <Flex
      direction={isLargerThan1080 ? "row" : "column"}
      justifyContent="flex-start"
      px={isLargerThan1080 ? 20 : 5}
    >
      <Head>
        <title>KIS - Dofus</title>
      </Head>
      {id && (
        <>
          <PlayerDetails uid={id} />
          <PlayerMatchs uid={id} />
        </>
      )}
    </Flex>
  );
}

export default Player;
