import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const useStatus = () => {
  const [code, setCode] = useState(200);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const handleFetch = async (id) => {
    try {
      const { data, error } = await supabase
        .from("client_status")
        .select()
        .order("created_at", { ascending: true });

      if (data) {
        setCode(data[0].code);
        setMessage(data[0].message);
        setDescription(data[0].description);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch();
  }, []);

  return [loading, code, message, description];
};

export const useStatusLog = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleFetch = async () => {
    try {
      const { data, error } = await supabase
        .from("client_status")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 20);

      if (data) {
        setLogs(data);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch();
  }, []);

  return [loading, logs];
};
