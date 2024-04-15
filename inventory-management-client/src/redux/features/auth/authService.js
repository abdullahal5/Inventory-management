import axios from "axios";

const api_URL = "http://localhost:5000/api/v1/users/";

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