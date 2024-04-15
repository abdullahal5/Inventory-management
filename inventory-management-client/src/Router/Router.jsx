import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/dahsboard/Dashboard";
import DashHome from "../pages/dahsboard/DashHome";
import AddProduct from "../pages/addproduct/AddProduct";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import Report from "../pages/report/Report";
import Allproduct from "../pages/allProduct/Allproduct";
import Register from "../pages/Register/Register";
import Login from "../pages/login/Login";
import PrivateRoute from "./private/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-blue-950">
        <div className="w-[1240px] mx-auto">
          <Home />
        </div>
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div className="bg-[#F9FAFB] h-screen">
        <div className="w-[1240px] mx-auto">
          <Register />
        </div>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div className="bg-[#F9FAFB] h-screen">
        <div className="w-[1240px] mx-auto">
          <Login />
        </div>
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashHome />,
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "editProfile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "allProuduct",
        element: (
          <PrivateRoute>
            <Allproduct />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
