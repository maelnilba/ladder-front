import { Image, Center } from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";

import { useEffect, useContext } from "react";
import { ctx } from "./context/Provider";

export const BannerKoli = ({ type }) => {
  const { typeK, changeK } = useContext(ctx);
  const [isLargerThan1080] = useMediaQuery(1080);
  const [isLargerThan780] = useMediaQuery(780);
  if (isLargerThan1080) {
    return (
      <Image
        src={`/assets/header_${typeK === 0 ? "3v3" : "1v1"}.jpg`}
        borderRadius={20}
        width="950px"
        height="220px"
      />
    );
  } else if (isLargerThan780) {
    return (
      <Image
        src={`/assets/header_${typeK === 0 ? "3v3" : "1v1"}.jpg`}
        borderRadius={20}
        width="425px"
        height="110px"
      />
    );
  } else {
    return (
      <Center>
        <Image
          src={`/assets/header_${typeK === 0 ? "3v3" : "1v1"}.jpg`}
          borderRadius={20}
          width="637px"
          height="165px"
        />
      </Center>
    );
  }
};
