import axios from "axios";
import { API_URL, API_TOKEN } from "../constants";

axios.defaults.baseURL = API_URL;

if (API_TOKEN) {
  axios.defaults.headers.common.Authorization = `Bearer ${API_TOKEN}`;
}

export default axios;