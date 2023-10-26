import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { AppRoutes } from "../../../routes/router";

type SectionFourProps = {};

export const SectionFour = ({}: SectionFourProps) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="w-full bg-[#dd3333] ">
      <div className="flex flex-col items-center py-14">
        <p className="text-white text-4xl font-bold">
          Tìm hiểu nghiệp vụ quản lý đào tạo Học viện
        </p>
        <Link
          to={isAuthenticated ? AppRoutes.CHAT : AppRoutes.LOGIN}
          className="mt-10 bg-white shadow-md px-8 py-4 rounded-md text-[#dd3333] text-xl font-bold hover:bg-slate-100 hover:text-red-500"
        >
          Nhấn vào đây
        </Link>
      </div>
    </div>
  );
};

export default SectionFour;
