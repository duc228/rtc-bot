import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

type DefaultLayoutProps = {};

const DefaultLayout = ({}: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#edf3f4]">
      <Sidebar />
      <div className="sm:ml-[300px] h-screen bg-green-200">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
