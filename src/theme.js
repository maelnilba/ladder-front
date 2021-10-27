import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { flashless } from "chakra-ui-flashless";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    black: "#282c2c",
  },
  fonts,
  breakpoints,
});

export default theme;
