import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useFetchPlayer = (initialId) => {
  const [id, setId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});

  const handleFetch = async (id) => {
    try {
      const { data, error } = await supabase
        .from("players")
        .select()
        .eq("id", id);

      setPayload(!error ? data[0] : {});
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(id);
  }, []);

  return [loading, payload];
};
