import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PtitLogo from "../../../assets/imgs/ptit-logo.png";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";
import useAuthStore from "../../../stores/useAuthStore";

type NavbarLandingProps = {};

export const NavbarLanding = ({}: NavbarLandingProps) => {
  const { isAuthenticated, logout } = useAuthStore();
  return (
    <nav className="w-full h-[70px] sticky border-b-2 border-slate-100">
      <div className="container flex justify-between h-full py-2">
        <Link to={AppRoutes.HOME}>
          <img src={PtitLogo} alt="Ptit logo" className="w-[100px] h-[50px]" />
        </Link>
        <div className="h-full flex gap-8">
          <ul className="uppercase h-full text-gray-500 text-[13px] font-semibold flex gap-8 items-center">
            <li>
              <Link
                to={AppRoutes.HOME}
                className="text-blue-500 hover:text-blue-500"
              >
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link to={AppRoutes.HOME} className="hover:text-blue-500">
                TUYỂN SINH
              </Link>
            </li>
            <li>
              <Link to={AppRoutes.HOME} className="hover:text-blue-500">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to={AppRoutes.HOME} className="hover:text-blue-500">
                Giảng viên
              </Link>
            </li>
            <li>
              <Link to={AppRoutes.HOME} className="hover:text-blue-500">
                Liên hệ
              </Link>
            </li>
          </ul>
          <div className=" h-full flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 font-bold cursor-pointer hover:text-blue-500" />
          </div>
        </div>
        <div className="h-full flex items-center">
          {isAuthenticated ? (
            <div className="flex gap-2">
              <Link
                to={AppRoutes.CHAT}
                className="bg-mainbg hover:bg-[#dd3333] text-white px-4 py-2 text-sm font-bold rounded-lg"
              >
                Chat với bot
              </Link>

              <button
                onClick={() => logout()}
                className="bg-slate-100 border-none px-4 py-2 rounded-lg hover:bg-slate-200"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to={AppRoutes.LOGIN}
              className="bg-mainbg hover:bg-[#dd3333] text-white px-4 py-2 text-sm font-bold rounded-lg"
            >
              Đăng Nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
