import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const getPseudoById = async (id) => {
  let { data, error } = await supabase
    .from("players")
    .select("pseudo")
    .eq("id", id);

  return !error ? data[0].pseudo : "unknow";
};

const getBreedById = async (id) => {
  let { data, error } = await supabase
    .from("players")
    .select("classe")
    .eq("id", id);

  return !error ? data[0].classe : 0;
};

const completeList3v3 = async (arr) => {
  let narr = [];
  for (let i = 0; i < arr.length; i++) {
    const {
      players1,
      players2,
      players3,
      players4,
      players5,
      players6,
      cote1,
      cote2,
      created_at,
      time,
    } = arr[i];
    let duration = null;
    if (time) {
      let d = new Date(time);
      let currentHours = d.getHours() - 1;

      let currentMinutes = d.getMinutes();

      duration =
        `0${currentHours}` +
        ":" +
        (currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes);
    }
    let nplayers = [
      1,
      created_at,
      {
        id: players1,
        pseudo: await getPseudoById(players1),
        classe: await getBreedById(players1),
        cote: cote1[0],
      },
      {
        id: players2,
        pseudo: await getPseudoById(players2),
        classe: await getBreedById(players2),
        cote: cote1[1],
      },
      {
        id: players3,
        pseudo: await getPseudoById(players3),
        classe: await getBreedById(players3),
        cote: cote1[2],
      },
      {
        id: players4,
        pseudo: await getPseudoById(players4),
        classe: await getBreedById(players4),
        cote: cote2[0],
      },
      {
        id: players5,
        pseudo: await getPseudoById(players5),
        classe: await getBreedById(players5),
        cote: cote2[1],
      },
      {
        id: players6,
        pseudo: await getPseudoById(players6),
        classe: await getBreedById(players6),
        cote: cote2[2],
      },
    ];

    narr.push({ nplayers, duration });
  }

  return narr;
};

const completeList1v1 = async (arr) => {
  let narr = [];
  for (let i = 0; i < arr.length; i++) {
    const { players1, players2, cote1, cote2, created_at, time } = arr[i];
    let duration = null;
    if (time) {
      let d = new Date(time);
      let currentHours = d.getHours() - 1;

      let currentMinutes = d.getMinutes();

      duration =
        `0${currentHours}` +
        ":" +
        (currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes);
    }

    let nplayers = [
      3,
      created_at,
      {
        id: players1,
        pseudo: await getPseudoById(players1),
        classe: await getBreedById(players1),
        cote: cote1,
      },
      {
        id: players2,
        pseudo: await getPseudoById(players2),
        classe: await getBreedById(players2),
        cote: cote2,
      },
    ];

    narr.push({ nplayers, duration });
  }

  return narr;
};

export const useFetchLastMatchs = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      let m1 = [];
      let m3 = [];
      const { data } = await supabase
        .from("matchs_1v1")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 4);

      if (data) {
        m1 = await completeList1v1(data);
      }

      const { data: da } = await supabase
        .from("matchs_3v3")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 4);

      if (da) {
        m3 = await completeList3v3(da);
      }
      let mlist = [...m1, ...m3];
      mlist.sort(function (x, y) {
        return x.nplayers[1] - y.nplayers[1];
      });
      setList(mlist);
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

  return [loading, list];
};
