import axios from 'axios';

const { REACT_APP_BASE_API_URI } = process.env;

const getApiClient = (baseUrl = REACT_APP_BASE_API_URI) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  return axiosInstance;
};

export default getApiClient;
