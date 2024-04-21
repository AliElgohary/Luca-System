import axios from "axios";
import { showToast } from "../utils/showToast";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  // withCredentials : true,
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const { msg } = error.response.data;

      showToast(msg, "error");
    }
  }
);
export default api;
