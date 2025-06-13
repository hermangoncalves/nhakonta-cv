import axios from "axios";
import { env } from "@/lib/env";

export const API = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
