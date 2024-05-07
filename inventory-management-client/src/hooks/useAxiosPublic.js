import Axios from "axios";
// http://localhost:5000
// https://inventory-management-server-beta.vercel.app
const axiosPublic = Axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
