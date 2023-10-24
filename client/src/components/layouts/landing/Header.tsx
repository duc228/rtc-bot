import { FaFacebook } from "react-icons/fa6";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Logo from "../../../assets/imgs/logoptithcm.png";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

type HeaderLandingProps = {};

const HeaderLanding = ({}: HeaderLandingProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <SubHeaderLanding />
      <div className="h-[122px] container ">
        <div className="h-full flex items-center justify-between">
          <div>
            <a
              href="https://ptithcm.edu.vn/lien-ket-dao-tao-quoc-te"
              target="_blank"
            >
              <img src={Logo} alt="logo ptit" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button className="uppercase bg-mainbg px-4 py-2 text-white flex items-center gap-1 hover:bg-sky-700">
              <EnvelopeIcon className="h-4 w-4 text-white" />
              <span className="">TƯ VẤN TUYỂN SINH ONLINE</span>
            </button>
            <button
              onClick={() => navigate(AppRoutes.LOGIN)}
              className="bg-slate-50 text-mainbg font-medium px-4 py-2 hover:bg-sky-700 hover:text-white"
            >
              Đăng Nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;

const SubHeaderLanding = () => {
  return (
    <div className="w-full bg-mainbg">
      <div className="container mx-auto flex justify-end">
        <div className="flex items-center gap-1">
          <a
            href="https://ptithcm.edu.vn/lien-ket-dao-tao-quoc-te"
            target="_blank"
            className="block-inline flex items-center p-2 gap-1 bg-red-600 rounded-2xl hover:bg-sky-700"
          >
            <EnvelopeIcon className="h-4 w-4 text-white" />
            <span className="uppercase text-[10px] text-white font-light">
              liên kết đào tạo quốc tế
            </span>
          </a>
          <FaFacebook className="text-sky-600 text-xl bg-white rounded-full border-0 outline-0" />
        </div>
      </div>
    </div>
  );
};
