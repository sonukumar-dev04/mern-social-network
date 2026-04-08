import axios from "axios";

const clientServer = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default clientServer;
