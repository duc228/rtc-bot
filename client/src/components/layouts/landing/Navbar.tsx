import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type NavbarLandingProps = {};

const NavbarLanding = ({}: NavbarLandingProps) => {
  return (
    <nav className="w-full h-[50px] border-y-2 border-slate-200 shadow-md flex items-center">
      <div className="container h-full flex justify-between">
        <ul className="text-mainbg h-full text-sm  font-semibold flex items-center gap-4 uppercase list-none">
          <li className="relative cursor-pointer">
            <a className="menu-item-after">Trang chủ</a>
          </li>
          <li className="relative cursor-pointer ">
            <a className="hover:menu-item-after">Giới thiệu</a>
          </li>
          <li className="relative cursor-pointer">
            <a>TIN TỨC</a>
          </li>

          <li className="relative cursor-pointer group">
            <a className=" hover:menu-item-after">TUYỂN SINH</a>

            <ul className="z-10 hidden group-hover:block absolute top-8 bg-slate-800 text-white text-[12px] normal-case font-normal py-2 w-[300px] e">
              <li className="border-t-[0.5px] border-slate-700 py-2 px-2">
                Đại học chính quy
              </li>
              <li className="border-t-[0.5px] border-slate-700 py-2 px-2">
                Đại học chính quy - Chương trình chất lượng cao
              </li>
              <li className="border-t-[0.5px] border-slate-700 py-2 px-2">
                Đại học từ xa
              </li>
              <li className="border-t-[0.5px] border-slate-700 py-2 px-2">
                Đại học vừa làm vừa học
              </li>
            </ul>
          </li>
          <li className="relative cursor-pointer">
            <a>hướng nghiệp</a>
          </li>

          <li className="relative cursor-pointer">
            <a>đào tạo</a>
          </li>
          <li className="relative cursor-pointer">
            <a>hợp tác</a>
          </li>

          <li className="relative cursor-pointer">
            <a>nghiên cứu</a>
          </li>
          <li className="relative cursor-pointer">
            <a>thư viện</a>
          </li>

          <li className="relative cursor-pointer">
            <a>sinh viên</a>
          </li>
          <li className="relative cursor-pointer">
            <a>việc làm</a>
          </li>

          <li className="relative cursor-pointer">
            <a>liên hệ</a>
          </li>
        </ul>
        <div className="h-full flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 font-extrabold cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
