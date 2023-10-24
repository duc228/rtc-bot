import { FaFacebook } from "react-icons/fa6";

type HeaderLandingProps = {};

const HeaderLanding = ({}: HeaderLandingProps) => {
  return (
    <div className="w-full bg-mainbg">
      <div className="container mx-auto flex justify-end">
        <div className="flex items-center">
          <a
            href="https://ptithcm.edu.vn/lien-ket-dao-tao-quoc-te"
            target="_blank"
          >
            <span className="uppercase">liên kết đào tạo 234 quốc tế</span>
          </a>
          <FaFacebook className="text-blue-300" />
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;
