import axios from "axios";

const api_URL =
  "https://inventory-management-server-beta.vercel.app/api/v1/users/";

const register = async (userData) => {
  const response = await axios.post(api_URL + "register", userData, {
    withCredentials: true,
  });
  return response;
};

const authService = {
    register
}

export default authService