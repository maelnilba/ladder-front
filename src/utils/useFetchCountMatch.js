import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useFetchCountMatch = (initialId) => {
  const [id, setId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState([0, 0]);

  const handleFetch = async (id) => {
    try {
      let { data, error, count } = await supabase
        .from("matchs_3v3")
        .select("id", { count: "exact" })
        .or(
          `players1.eq.${id},players2.eq.${id},players3.eq.${id},players4.eq.${id},players5.eq.${id},players6.eq.${id}`
        )
        .order("created_at", { ascending: false });
      let {
        data: res,
        error: err,
        count: cnt,
      } = await supabase
        .from("matchs_1v1")
        .select("id", { count: "exact" })
        .or(`players1.eq.${id},players2.eq.${id}`);

      setCount(!error && !err ? [count, cnt] : [0, 0]);
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

  return [loading, count];
};
