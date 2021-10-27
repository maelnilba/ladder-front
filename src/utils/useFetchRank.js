import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useFetchRank = (filters) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleFetch = async (filters) => {
    const { typeK, breedK, levelK, serverK, pseudoK, orderK } = filters;
    try {
      let filt = [];
      if (breedK !== null && breedK !== "all") {
        filt.push(`classe.eq.${breedK + 1}`);
      }
      if (levelK) {
        filt.push(`level.eq.${levelK}`);
      }
      if (serverK && serverK !== "All" && serverK !== "all") {
        filt.push(`serveur.eq.${serverK}`);
      }
      if (pseudoK) {
        filt.push(`pseudo.ilike.${pseudoK}`);
      }
      let r = "and(";
      for (let i = 0; i < filt.length; i++) {
        if (i == 0) {
          r = r + filt[i];
        } else {
          r = r + `,${filt[i]}`;
        }
      }
      r = r + ")";
      if (r !== "and()") {
        const { data, error } = await supabase
          .from("players")
          .select()
          .or(`${r}`)
          .gt(typeK == 0 ? "cote_3v3" : "cote_1v1", 1)
          .limit(100)
          .order(typeK == 0 ? "cote_3v3" : "cote_1v1", {
            ascending: orderK === "asc" ? true : false,
          });
        setList(!error ? data : []);
      } else {
        const { data, error } = await supabase
          .from("players")
          .select()
          .gt(typeK == 0 ? "cote_3v3" : "cote_1v1", 1)
          .limit(100)
          .order(typeK == 0 ? "cote_3v3" : "cote_1v1", {
            ascending: orderK === "asc" ? true : false,
          });
        setList(!error ? data : []);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch(filters);
  }, []);

  const reFetch = (filters) => {
    handleFetch(filters);
  };

  return [loading, list, reFetch];
};
