import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const get = async (url) => {
  const { data } = await axios.get(url);
  return data;
};
export const post = async (url) => {
  const { data } = await axios.post(url);
  return data;
};
