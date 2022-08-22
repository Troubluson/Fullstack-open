import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((request) => request.data)
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(blog)
  console.log(config)
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const update = async (blog) => {
  blog.user = blog.user.id
  const request = await axios.put(baseUrl + `/${blog.id}`, blog)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(baseUrl + `/${id}`, config)
  return request.data
}

export default { getAll, create, update, remove, setToken, removeToken }
