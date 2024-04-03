import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex bg-[#F9FAFB] ">
      <div>
        <Sidebar />
      </div>
      <div className="pt-8 w-[1200px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
