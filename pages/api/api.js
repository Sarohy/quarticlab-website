import axios from "axios";
axios.defaults.baseURL =
  "https://t2brb4ve22.execute-api.us-east-2.amazonaws.com";

export const postAPI = async (url, body) => {
  const res = await axios.post(url, body);
  return res;
};
