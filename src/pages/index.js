import Head from "next/head";
import { PageContainer } from "../components/PageContainer";

const Index = () => {
  return (
    <>
      <Head>
        <title>KIS - Ladder</title>
        <link rel="shortcut icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Ladder non officiel dédié au Kolizeum InterServeur de Dofus."
        />
      </Head>
      <PageContainer />
    </>
  );
};

export default Index;
