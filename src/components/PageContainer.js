import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "../utils/useMediaQuery";
import { BannerKoli } from "./BannerKoli";
import { KoliTypeTabs } from "./KoliTypeTabs";
import { FilterMenu } from "./FilterMenu";
import { RankingList } from "./RankingList";
import { Ctx } from "./context/Provider";

export function PageContainer(props) {
  const [isLargerThan780] = useMediaQuery(780);
  if (isLargerThan780) {
    return (
      <Ctx>
        <Flex direction="row" justifyContent="space-around">
          <Flex direction="column">
            <KoliTypeTabs></KoliTypeTabs>

            <RankingList></RankingList>
          </Flex>
          <FilterMenu />
        </Flex>
      </Ctx>
    );
  } else {
    return (
      <Ctx>
        <Flex direction="column" justifyContent="space-around">
          <Flex direction="column">
            <FilterMenu />
            <KoliTypeTabs></KoliTypeTabs>
            <RankingList></RankingList>
          </Flex>
        </Flex>
      </Ctx>
    );
  }
}
