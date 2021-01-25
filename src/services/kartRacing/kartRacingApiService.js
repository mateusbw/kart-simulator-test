import Axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

const axios = Axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });

export const get = async (url) => {
  try {
    console.log('Entrei aqui');
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.error("Error request: ", e);
    throw e;
  }
};
