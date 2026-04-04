import axios from "axios";

const clientServer = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default clientServer;
