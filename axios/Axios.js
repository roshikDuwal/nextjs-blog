import { Base_Url } from "@/constants/Base_Url";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: Base_Url,
  headers: {
    "Content-Type": "application/json",
  },
});
