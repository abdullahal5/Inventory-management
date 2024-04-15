import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, toggleLoading } from "../../redux/features/auth/authSlice";
import { FaSpinner, FaUser } from "react-icons/fa";
import Axios from "axios";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { isLoggedIn, isError, isLoading, email } = useSelector(
    (state) => state.auth
  );

  const handleGetRegisterUserInfo = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || !name) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("password must be up to 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    if (image) {
      userData.photo = image;
    }

    await dispatch(register(userData)).then(() => {
      e.target.reset();
      setImage("");
      dispatch(toggleLoading(false));
      if (isLoggedIn) {
        navigate("/");
      }
    });
  };

  // useEffect(() => {
  //   if (isSuccess && isLoggedIn) {
  //     navigate("/");
  //   }
  // dispatch(togg);
  // }, [isSuccess, isLoggedIn, navigate, dispatch]);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await Axios.post(
        "https://api.imgbb.com/1/upload?key=32759f60f432e8e5c388e20a2da70600",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      setImage(res.data.data.display_url);
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="bg-gray-50">
      <Toaster />
      <div className="flex justify-center items-center pt-12  lg:flex-row-reverse md:flex-row-reverse flex-col-reverse gap-10">
        <div className="flex items-center flex-col gap-10">
          <div>
            {image ? (
              <div>
                <img
                  className="w-20 h-20 object-cover rounded-full border border-blue-500"
                  src={image}
                  alt=""
                />
              </div>
            ) : (
              <div className="border rounded-full p-5 border-blue-500">
                <FaUser fontSize="5rem" color="#757575" />
              </div>
            )}
          </div>
          <label className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">
            Upload Profile Picture
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        <div className="pt-5">
          <div className="bg-white lg:w-[400px] w-[300px] p-5 mx-auto  text-center shadow-xl rounded-xl space-y-4">
            <h1 className="text-orange-400 text-center text-3xl font-semibold">
              Register
            </h1>
            <form onSubmit={handleGetRegisterUserInfo} className="space-y-4">
              <input
                type="text"
                className="border-2 py-3 lg:w-80 md:w-64 w-64 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500 mx-auto"
                name="name"
                placeholder="Write your Name"
              />

              <input
                type="email"
                className="border-2 py-3 lg:w-80 md:w-64 w-64 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500 mx-auto"
                name="email"
                placeholder="Write your e-mail"
              />

              <div className="relative">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 py-3 lg:w-80 md:w-64 w-64 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500 mx-auto"
                  name="password"
                  placeholder="Write your password"
                />
              </div>
              <input
                type="password"
                className="border-2 py-3 lg:w-80 md:w-64 w-64 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500 mx-auto"
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                placeholder="confirm password"
              />
              <button
                disabled={password !== confirmPassword}
                className={`w-full bg-blue-500 py-2 text-white font-semibold rounded-lg text-center mx-auto ${
                  password !== confirmPassword ? "bg-gray-300" : ""
                }`}
              >
                {isLoading ? (
                  <FaSpinner className="mx-auto animate-spin" />
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <div className="space-y-4 pt-2">
              <p>
                Already have an account?
                <Link to="/login">
                  <span className="text-orange-400 font-semibold cursor-pointer pl-2">
                    Please Login
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
