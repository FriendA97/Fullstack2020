import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const update = async (id, newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default { getAll, setToken, create, update, deleteBlog };
