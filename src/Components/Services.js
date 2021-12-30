import axios from "axios";

const URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(URL).then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  return axios.post(URL, newObject).then((response) => {
    return response.data;
  });
};

const updateObject = (id, updatedObject) => {
  return axios.put(URL + "/" + id, updatedObject).then((response) => {
    return response.data;
  });
};

const deleteById = (id) => {
  return axios.delete(URL + "/" + id);
};

export default {
  getAll,
  create,
  updateObject,
  deleteById,
};
