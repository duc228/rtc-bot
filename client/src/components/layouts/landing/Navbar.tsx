import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import PtitLogo from "../../../assets/imgs/ptit-logo.png";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

type NavbarLandingProps = {};

export const NavbarLanding = ({}: NavbarLandingProps) => {
  return (
    <nav className="w-full h-[70px] sticky border-b-2 border-slate-100">
      <div className="container flex justify-between h-full py-2">
        <Link to={AppRoutes.HOME}>
          <img src={PtitLogo} alt="Ptit logo" className="w-[100px] h-[50px]" />
        </Link>
        <div className="h-full flex gap-8">
          <ul className="uppercase h-full text-gray-500 text-[13px] font-semibold flex gap-8 items-center">
            <li>
              <Link to={AppRoutes.HOME} className="hover:text-blue-500">
                TRANG CHỦ
              </Link>
            </li>
            <li>TUYỂN SINH </li>
            <li>Giới thiệu</li>
            <li>Giảng viên</li>
            <li>Liên hệ</li>
          </ul>
          <div className=" h-full flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 font-bold cursor-pointer" />
          </div>
        </div>
        <div className="h-full flex items-center">
          <Link
            to={AppRoutes.LOGIN}
            className="bg-mainbg hover:bg-[#dd3333] text-white px-4 py-2 text-sm font-bold rounded-lg"
          >
            Đăng Nhập
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
