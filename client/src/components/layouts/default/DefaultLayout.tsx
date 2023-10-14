import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MessageInput from "../../../features/message/components/MessageInput";

type DefaultLayoutProps = {};

const DefaultLayout = ({}: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#edf3f4]">
      <Sidebar />
      <div className="sm:ml-[300px] h-screen">
        <div
          className="flex flex-col items-center mx-auto p-2 w-full sm:max-w-[800px] bg-green-200 h-full
        "
        >
          <div className="flex-1">
            <Outlet />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
