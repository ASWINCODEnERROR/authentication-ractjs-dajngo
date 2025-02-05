import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode correctly
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://localhost:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access); // Use jwtDecode correctly
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Token refresh failed:", error.message);
      // Handle token refresh failure here
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
