import axios from "axios";

const CORS_BYPASS = "https://frozen-citadel-28185.herokuapp.com/";
const URL = "https://semantle-he.herokuapp.com/api/distance?word=";

export const guess = async (word: string) => {
  const res = await axios.get(`${CORS_BYPASS + URL + word}`);

  if (res.status !== 200) throw new Error(`${res.status}: ${res.statusText}`);

  if (res.data.similarity === null) throw new Error("unknown word");

  return res.data;
};
