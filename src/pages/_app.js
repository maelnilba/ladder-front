import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Container } from "../components/Container";
import { Body } from "../components/Body";
import { Navbar } from "../components/Navbar";
import { BetaBanner } from "../components/BetaBanner";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
        <Container minHeight="100vh">
          <Body>
            <Navbar />
            <BetaBanner />
            <Component {...pageProps} />
            <Footer />
          </Body>
        </Container>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
