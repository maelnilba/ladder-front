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

const completeList3v3 = async (arr, his_id) => {
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

    let his_cote = 0;
    if (players1 == his_id) {
      his_cote = cote1[0];
    } else if (players2 == his_id) {
      his_cote = cote1[1];
    } else if (players3 == his_id) {
      his_cote = cote1[2];
    } else if (players4 == his_id) {
      his_cote = cote2[0];
    } else if (players5 == his_id) {
      his_cote = cote2[1];
    } else if (players6 == his_id) {
      his_cote = cote2[2];
    }

    narr.push({ nplayers, his_cote, duration });
  }

  for (let i = 0; i < narr.length; i++) {
    if (i == narr.length - 1) {
      narr[i] = { ...narr[i], result: -1 };
    } else {
      if (narr[i + 1].his_cote < narr[i].his_cote) {
        narr[i] = { ...narr[i], result: 1 };
      } else {
        if (narr[i + 1].his_cote == narr[i].his_cote) {
          narr[i] = { ...narr[i], result: -1 };
        } else {
          narr[i] = { ...narr[i], result: 0 };
        }
      }
    }
  }

  return narr;
};

const completeList1v1 = async (arr, his_id) => {
  let narr = [];
  for (let i = 0; i < arr.length; i++) {
    const { players1, players2, cote1, cote2, time } = arr[i];
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

    let his_cote = 0;
    if (players1 == his_id) {
      his_cote = cote1;
    } else if (players2 == his_id) {
      his_cote = cote2;
    }
    narr.push({ nplayers, his_cote, duration });
  }

  for (let i = 0; i < narr.length; i++) {
    if (i == narr.length - 1) {
      narr[i] = { ...narr[i], result: -1 };
    } else {
      if (narr[i + 1].his_cote < narr[i].his_cote) {
        narr[i] = { ...narr[i], result: 1 };
      } else {
        if (narr[i + 1].his_cote == narr[i].his_cote) {
          narr[i] = { ...narr[i], result: -1 };
        } else {
          narr[i] = { ...narr[i], result: 0 };
        }
      }
    }
  }

  return narr;
};

export const useFetchMatch1v1 = (initialId, page = 1) => {
  const nToDisplay = 5;
  const [id, setId] = useState(initialId);
  const [pagination, setPagination] = useState(page);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const handleFetch = async (id, pagination) => {
    try {
      let matchs = [];
      let pgl = pagination == 1 ? 0 : -1;
      let limit = {
        a: pagination * nToDisplay - nToDisplay + pgl,
        b: pagination * nToDisplay,
      };

      let { data, error } = await supabase
        .from("matchs_1v1")
        .select()
        .range(limit.a, limit.b)
        .or(`players1.eq.${id},players2.eq.${id}`)
        .order("created_at", { ascending: false });

      matchs = !error ? data : [];
      matchs = await completeList1v1(matchs, id);
      if (pagination > 1) {
        matchs.shift();
      }
      if (matchs.length > nToDisplay) {
        matchs.pop();
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setList(matchs);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(id, pagination);
  }, [pagination]);

  return [loading, list, hasMore, setPagination];
};

export const useFetchMatch3v3 = (initialId, page = 1) => {
  const nToDisplay = 5;
  const [id, setId] = useState(initialId);
  const [pagination, setPagination] = useState(page);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const handleFetch = async (id, pagination) => {
    try {
      let matchs = [];
      let pgl = pagination == 1 ? 0 : -1;
      let limit = {
        a: pagination * nToDisplay - nToDisplay + pgl,
        b: pagination * nToDisplay,
      };

      let { data, error } = await supabase
        .from("matchs_3v3")
        .select()
        .or(
          `players1.eq.${id},players2.eq.${id},players3.eq.${id},players4.eq.${id},players5.eq.${id},players6.eq.${id}`
        )
        .range(limit.a, limit.b)
        .order("created_at", { ascending: false });

      matchs = !error ? data : [];
      matchs = await completeList3v3(matchs, id);
      if (pagination > 1) {
        matchs.shift();
      }
      if (matchs.length > nToDisplay) {
        matchs.pop();
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setList(matchs);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(id, pagination);
  }, [pagination]);

  return [loading, list, hasMore, setPagination];
};

export const useFetchMatch = (initialId, pagination = [1, 1]) => {
  const nToDisplay = 5;
  const [id, setId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [list1v1, setList1v1] = useState([]);
  const [list3v3, setList3v3] = useState([]);
  const [hasMore, setHasMore] = useState([false, false]);

  const handleFetch = async (id, pagination) => {
    try {
      let matchs3v3 = [];
      let matchs1v1 = [];
      let limit3v3 = {
        a: pagination[0] * nToDisplay - nToDisplay,
        b: pagination[0] * nToDisplay,
      };
      let limit1v1 = {
        a: pagination[1] * nToDisplay - nToDisplay,
        b: pagination[1] * nToDisplay,
      };
      let { data, error } = await supabase
        .from("matchs_3v3")
        .select()
        .or(
          `players1.eq.${id},players2.eq.${id},players3.eq.${id},players4.eq.${id},players5.eq.${id},players6.eq.${id}`
        )
        .range(limit3v3.a, limit3v3.b)
        .order("created_at", { ascending: false });
      let { data: res, error: err } = await supabase
        .from("matchs_1v1")
        .select()
        .range(limit1v1.a, limit3v3.b)
        .or(`players1.eq.${id},players2.eq.${id}`);

      matchs3v3 = !error ? data : [];
      matchs1v1 = !err ? res : [];

      matchs3v3 = await completeList3v3(matchs3v3, id);
      matchs1v1 = await completeList1v1(matchs1v1, id);
      matchs1v1.pop();
      matchs3v3.pop();
      setList1v1(matchs1v1);
      setList3v3(matchs3v3);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleFetch(id, pagination);
  }, []);

  return [loading, list1v1, list3v3];
};
