import { Button } from "@mui/material";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { ChatList } from "../../../features/chat/components";
import useAuthStore from "../../../stores/useAuthStore";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  return (
    <div className="fixed top-0 bottom-0 bg-white w-full sm:w-[300px] flex flex-col shadow-md">
      <div className="w-full p-2 h-10">
        <SideBarHeader />
      </div>
      <div className="mt-2 w-full flex-1 overflow-auto">
        <ChatList />
      </div>
      <div className="w-full">
        <SideBarFooter />
      </div>
    </div>
  );
};

export default Sidebar;

export const SideBarHeader = () => {
  return (
    <div className="flex gap-2 ">
      <Button variant="outlined" className="rounded-md flex-1 border-sky-500">
        <PlusIcon className="h-4 w-4" />

        <span className="normal-case ml-3 ">New Chat</span>
      </Button>
      {/* <Button variant="text" className="h-full pr-3 min-w-fit">
          <AdjustmentsHorizontalIcon className="h-5 w-5 " />
        </Button> */}
    </div>
  );
};

const SideBarFooter = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full bg-white border-t-2 p-1">
      <div className="w-full flex items-center p-3 hover:cursor-pointer rounded-md hover:bg-slate-200 justify-between gap-5">
        <div className="flex-1 overflow-hidden ">
          <p className="truncate text-sm">{user?.email}</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
