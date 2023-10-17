import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MessageInput } from "../../../features/message/components";
import App from "../../../App";

type DefaultLayoutProps = {};

const DefaultLayout = ({}: DefaultLayoutProps) => {
  return (
    <App>
      <div className="min-h-screen bg-[#edf3f4] ">
        <Sidebar />
        <div className="sm:ml-[300px] h-screen ">
          <div
            className="flex flex-col items-center mx-auto w-full h-full pb-3 
        "
          >
            <div
              className="flex-1 w-full overflow-auto flex flex-col-reverse"
              id="scrollMessage"
            >
              <Outlet />
            </div>
            <MessageInput />
          </div>
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;
