import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/authSlice";


const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  //  const { isLoading, isLoggedIn, isSuccess } = useSelector(
  //    (state) => state.auth
  //  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const userData = {
      email,
      password,
    };

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("password must be up to 6 characters");
    }

       await dispatch(login(userData)).then(() => {
         navigate("/");
       });
  };

  return (
    <div className="bg-gray-50">
      <Toaster />
      <div className="lg:pt-4 md:pt-4 pt-10 flex justify-center items-center lg:h-[100vh] md:h-[100vh] lg:flex-row md:flex-row flex-col gap-10">
        <div className="lg:w-auto md:w-auto w-72 mx-auto">
          <img
            src="https://i.ibb.co/DwL5q20/undraw-Access-account-re-8spm-1.png"
            className="mx-auto "
            alt=""
          />
        </div>
        <div className="bg-white lg:w-[400px] md:w-[300px] mx-auto lg:p-10 md:p-2 p-2 shadow-xl rounded-xl space-y-4">
          <h1 className="text-orange-400 text-center text-3xl font-semibold">
            Login
          </h1>
          <hr className="border-gray-400 border-1" />
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              className="border-2 py-3 lg:w-80 md:w-72 w-72 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500"
              name="email"
              placeholder="Write your e-mail"
            />
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                className="border-2 py-3 lg:w-80 md:w-27 w-72 bg-slate-200 rounded-lg pl-5 block outline-none border-gray-500"
                name="password"
                placeholder="Write your password"
              />
              <div className="absolute right-5 top-4 cursor-pointer">
                {isShowPassword ? (
                  <IoIosEyeOff
                    fontSize={20}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <IoIosEye
                    fontSize={20}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                )}
              </div>
            </div>
            <button className="w-full bg-blue-500 py-2 text-white font-semibold rounded-lg text-center mx-auto">
              Login
            </button>
          </form>
          <p>
            Don&apos;t have any account?
            <Link to="/register">
              <span className="text-orange-400 font-semibold cursor-pointer pl-2">
                Please Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
