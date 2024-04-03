import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/dahsboard/Dashboard";
import DashHome from "../pages/dahsboard/DashHome";

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
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashHome />,
        // index: true
      },
    ],
  },
]);

export default router;
