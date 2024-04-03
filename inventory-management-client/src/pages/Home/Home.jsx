import { Link } from "react-router-dom";
import gif from "/__.gif";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="text-white flex items-center justify-between pt-10">
        <h1 className="text-3xl">Inventory App</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="border px-3 py-2 border-blue-600 rounded-xl"
          >
            Login
          </Link>
          <Link to="/register" className="bg-blue-600 px-3 py-2 rounded-xl">
            Register
          </Link>
        </div>
      </div>
      <div className="flex items-center h-[80vh] justify-center gap-20">
        <div className="w-[80%]">
          <h1 className="text-4xl text-white font-semibold">
            Inventory & Stock <br /> Management <br /> System
          </h1>
          <p className="text-white pt-5 text-lg w-[600px]">
            Simplify inventory management with our intuitive system. Track,
            optimize, and organize effortlessly for increased efficiency.
            Experience seamless operations and enhanced productivity with our
            user-friendly solution.
          </p>
          <div className="text-white flex items-center gap-7 pt-5">
            <div className="flex items-center text-center flex-col">
              <span className="text-3xl">14k</span>
              <span className="text-xl">Brand Owners</span>
            </div>
            <div className="flex items-center text-center flex-col">
              <span className="text-3xl">25k</span>
              <span className="text-xl">Active Users</span>
            </div>
            <div className="flex items-center text-center flex-col">
              <span className="text-3xl">500+</span>
              <span className="text-xl">Partners</span>
            </div>
          </div>
        </div>
        <div className="">
          <img className="w-[600px] rounded-xl" src={gif} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
