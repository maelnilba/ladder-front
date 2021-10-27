import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useFetchPlayerByPseudo = (initialPseudo) => {
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState([]);

  const handleFetch = async (pseudo) => {
    if (pseudo) {
      try {
        let { data, error } = await supabase
          .from("players")
          .select("id, pseudo, classe, level, serveur")
          .ilike("pseudo", `${pseudo}%`)
          .limit(5);

        setPayload(!error ? data : []);
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setPayload([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(pseudo);
  }, [pseudo]);

  return [loading, payload, setPseudo];
};
