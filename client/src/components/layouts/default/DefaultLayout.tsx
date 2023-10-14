import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MessageInput from "../../../features/message/components/MessageInput";

type DefaultLayoutProps = {};

const DefaultLayout = ({}: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#edf3f4] ">
      <Sidebar />
      <div className="sm:ml-[300px] h-screen ">
        <div
          className="flex flex-col items-center mx-auto w-full h-full pb-3 
        "
        >
          <div className="flex-1 w-full overflow-auto ">
            <Outlet />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
