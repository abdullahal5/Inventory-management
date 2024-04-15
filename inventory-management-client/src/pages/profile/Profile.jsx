import { useSelector } from "react-redux";
import FindUser from "../../hooks/FindUser";
import { useEffect, useState } from "react";

const Profile = () => {
  const [findUser, setFindUser] = useState(null);
  const { email } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const GetData = async () => {
      const userData = await FindUser({ email });
      setFindUser(userData);
    };
    GetData();
  }, [email]);

  return (
    <div className=" h-auto mx-10 rounded-lg">
      <div className="bg-[url('https://i.ibb.co/vBJy1L6/abstract-pastel-gradient-color-background-with-blank-blur-and-smooth-vector.jpg')] h-32 bg-no-repeat bg-cover bg-center relative rounded-lg">
        <div className="top-3/4 left-5 absolute flex items-center gap-5">
          <img
            className="w-32 rounded-full h-32 object-cover"
            src={findUser?.photo}
            alt=""
          />
          <div className="pt-10">
            <h1 className="text-3xl font-semibold">{findUser?.name}</h1>
            <p className="font-semibold">MERN Stack Developer</p>
          </div>
        </div>
        <span className="text-lg bg-gray-200 absolute right-5 bottom-5 font-semibold bg-opacity-70 px-3 py-1 cursor-pointer rounded-xl">
          Change Cover
        </span>
      </div>
      <div className="pt-32">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Personal Information</h1>
          <span className="text-xl font-medium text-rose-500 cursor-pointer">
            Edit
          </span>
        </div>
        <div className="pt-5 text-lg font-medium space-y-3">
          <div className="flex items-center">
            <p className="w-64">Phone</p>
            <p>{findUser?.phone}</p>
          </div>
          <div className="flex items-center">
            <p className="w-64">Email</p>
            <p>{findUser?.email}</p>
          </div>
          <div className="flex items-center">
            <p className="w-64">Bio</p>
            <p>{findUser?.bio}</p>
          </div>
          <div className="flex items-center">
            <p className="w-64">Address</p>
            <p>Rupganj, Narayangaj, Dhaka</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-10">
          <h1 className="text-2xl font-semibold">Security</h1>
          <span className="text-xl font-medium text-rose-500 cursor-pointer">
            Edit
          </span>
        </div>
        <div className="py-5 text-lg font-medium space-y-3">
          <div className="flex items-center">
            <p className="w-64">Password</p>
            <p>************</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
