import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
