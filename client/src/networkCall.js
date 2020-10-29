import axios from "axios";

const postRequest = async (query) => {
  const result = await axios.post("http://localhost:5000/", { query: query });
  return result;
};

export { postRequest };
