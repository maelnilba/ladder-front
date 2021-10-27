import React, { useState } from "react";

export const ctx = React.createContext(null);

export function Ctx({ children }) {
  const [typeK, setTypeK] = useState(0);
  const [breedK, setBreedK] = useState("all");
  const [serverK, setServerK] = useState("all");
  const [levelK, setLevelK] = useState(200);
  const [pseudoK, setPseudoK] = useState("");
  const [orderK, setOrderK] = useState("desc");

  const changeK = (n) => {
    setTypeK(n);
  };

  const changebK = (n) => {
    setBreedK(n);
  };

  const changesK = (n) => {
    setServerK(n);
  };

  const changelK = (n) => {
    setLevelK(n);
  };

  const changepK = (n) => {
    setPseudoK(n);
  };

  const changeoK = () => {
    if (orderK === "desc") {
      setOrderK("asc");
    } else if (orderK === "asc") {
      setOrderK("desc");
    }
  };

  return (
    <ctx.Provider
      value={{
        typeK,
        changeK,
        serverK,
        levelK,
        pseudoK,
        breedK,
        orderK,
        changebK,
        changelK,
        changepK,
        changesK,
        changeoK,
      }}
    >
      {children}
    </ctx.Provider>
  );
}
