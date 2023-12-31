import { Button, Menu, MenuItem } from "@mui/material";
import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { ChatList } from "../../../features/chat/components";
import useAuthStore from "../../../stores/useAuthStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

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
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 ">
      <Button
        variant="outlined"
        className="rounded-md flex-1 border-mainbg text-mainbg"
        onClick={() => navigate(AppRoutes.CHAT)}
      >
        <PlusIcon className="h-4 w-4 text-mainbg" />

        <span className="normal-case ml-3 text-mainbg">Tạo mới</span>
      </Button>
      {/* <Button variant="text" className="h-full pr-3 min-w-fit">
          <AdjustmentsHorizontalIcon className="h-5 w-5 " />
        </Button> */}
    </div>
  );
};

const SideBarFooter = () => {
  const [menu, setMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menu);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  const { user, logout } = useAuthStore();
  return (
    <div className="w-full bg-white border-t-2 p-1">
      <div className="w-full  p-3 hover:cursor-pointer rounded-md hover:bg-slate-200 ">
        <button
          className="flex items-center justify-between gap-5 w-full"
          onClick={handleClick}
        >
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm">{user?.email}</p>
          </div>
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={menu}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          Đăng Xuất
        </MenuItem>
      </Menu>
    </div>
  );
};
