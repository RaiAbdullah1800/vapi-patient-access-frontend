import axios from "axios";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized or session expired.");
    }
    return Promise.reject(error);
  }
);

// ✅ HTTP Methods
export const get = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const patch = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.patch(url, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const isSuccessResp = (status) => status >= 200 && status < 300;
