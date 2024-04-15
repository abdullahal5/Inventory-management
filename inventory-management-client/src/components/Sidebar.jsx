import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../firebase.config";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    signOut(auth);
    dispatch(logout())
  };

  return (
    <div className="w-64 border px-10 py-12 h-screen bg-white overflow-y-hidden">
      <Link to="/">
        <h1 className="text-2xl font-bold text-center">Inventory App</h1>
      </Link>
      <hr className="my-5 border border-gray-300" />
      <ul>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold gap-2 py-2 px-5 text-black">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-orange-500 items-center flex gap-2"
                  : "items-center flex gap-2"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </h1>
        </li>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-orange-500 items-center flex gap-2"
                  : "items-center flex gap-2"
              }
              to="allProuduct"
            >
              All Product
            </NavLink>
          </h1>
        </li>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-orange-500 items-center flex gap-2"
                  : "items-center flex gap-2"
              }
              to="addProduct"
            >
              Add Product
            </NavLink>
          </h1>
        </li>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-orange-500 items-center flex gap-2"
                  : "items-center flex gap-2"
              }
              to="profile"
            >
              Profile
            </NavLink>
          </h1>
        </li>
        <li className=" rounded-xl"></li>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-orange-500 items-center flex gap-2"
                  : "items-center flex gap-2"
              }
              to="report"
            >
              Report Bug
            </NavLink>
          </h1>
        </li>
        <li className="hover:bg-gray-200 rounded-xl">
          <h1 className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
            <button onClick={handleLogout}>Log out</button>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
