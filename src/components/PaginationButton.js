import { Flex, IconButton } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "../utils/useMediaQuery";

export function PaginationButton({ page, hasMore, handleClick }) {
  const [isLargerThan1080] = useMediaQuery(1080);
  return (
    <Flex direction="row">
      <IconButton
        onClick={() => handleClick("dec")}
        variant="outline"
        isDisabled={page == 1 ? true : false}
        colorScheme="gray"
        aria-label="Call Sage"
        fontSize="8px"
        icon={<ArrowLeftIcon />}
        size={isLargerThan1080 ? "sm" : "md"}
      />
      <IconButton
        onClick={() => handleClick("inc")}
        variant="outline"
        isDisabled={!hasMore}
        colorScheme="gray"
        aria-label="Call Sage"
        fontSize="8px"
        icon={<ArrowRightIcon />}
        size={isLargerThan1080 ? "sm" : "md"}
      />
    </Flex>
  );
}
