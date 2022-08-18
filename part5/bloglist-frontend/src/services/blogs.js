import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const removeToken = () => {
  token = null;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((request) => request.data);
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

export default { getAll, create, setToken, removeToken };
