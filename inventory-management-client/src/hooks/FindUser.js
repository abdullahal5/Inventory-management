import useAxiosPublic from "./useAxiosPublic";

const FindUser = async ({ email }) => {
  const axiosPublic = useAxiosPublic();

  try {
    const res = await axiosPublic.get("/api/v1/users/getAllUser");
    return res?.data?.find((user) => user?.email === email);
  } catch (error) {
    return null;
  }
};

export default FindUser;
