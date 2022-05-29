import axios from "axios";

const baseURL = "api/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => {
    return response.data;
  });
};

const updateObject = (id, updatedObject) => {
  return axios.put(baseURL + "/" + id, updatedObject).then((response) => {
    return response.data;
  });
};

const deleteById = (id) => {
  return axios.delete(baseURL + "/" + id);
};

export default {
  getAll,
  create,
  updateObject,
  deleteById,
};
