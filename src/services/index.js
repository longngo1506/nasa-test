import axios from "axios";

export const services = axios.create({
  baseURL: "https://images-api.nasa.gov/",
});
