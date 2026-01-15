import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://bw-server-seven.vercel.app/api",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
