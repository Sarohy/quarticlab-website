import axios from 'axios';
// const BASE_URL = "http://139.59.37.140:8001/";

const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getApiWithoutAuth = async (url) => {
  try {
    const res = await baseInstance.get(url);
    return {
      data: res.data,
    };
  } catch (err) {
    return err.response;
  }
};
