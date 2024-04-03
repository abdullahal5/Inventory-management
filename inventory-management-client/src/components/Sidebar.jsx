import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-64 border px-10 py-12 h-screen bg-white">
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
              to="/addProduct"
            >
              Add Product
            </NavLink>
          </h1>
        </li>
        <li className=" rounded-xl">
          <h1
            className="text-xl font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black cursor-pointer"
            onClick={toggleDropdown}
          >
            account
          </h1>
          <div className="pl-5">
            {isOpen && (
              <ul className="sub-nav">
                <li className="hover:bg-gray-200 rounded-xl">
                  <h1 className="text-lg font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-orange-500 items-center flex gap-2"
                          : "items-center flex gap-2"
                      }
                      to="/addProduct"
                    >
                      Profile
                    </NavLink>
                  </h1>
                </li>
                <li className="hover:bg-gray-200 rounded-xl">
                  <h1 className="text-lg font-semibold items-center flex justify-start gap-2 py-2 px-5 text-black">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-orange-500 items-center flex gap-2"
                          : "items-center flex gap-2"
                      }
                      to="/addProduct"
                    >
                      Edit Profile
                    </NavLink>
                  </h1>
                </li>
              </ul>
            )}
          </div>
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
              to="/sample"
            >
              Report Bug
            </NavLink>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
