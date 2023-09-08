import axios from "axios";
const url = "https://jsonplaceholder.typicode.com/posts";
export const PostService = () => {
  return axios.get(url);
};
