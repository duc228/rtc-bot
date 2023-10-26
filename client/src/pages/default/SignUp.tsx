import { SignUpForm } from "../../features/auth/components";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/router";

type SignUpPageProps = {};

const SignUpPage = ({}: SignUpPageProps) => {
  return (
    <div className="w-full sm:w-[350px] md:w-[440px] mt-20">
      <h3 className="font-bold text-black text-3xl text-center">
        Tạo tài khoản mới
      </h3>
      <div className="mt-8 p-6 rounded-md">
        <SignUpForm />
        <div className="flex flex-col w-full items-center mt-4">
          <p className="my-2">Hoặc</p>
          <div className=" flex gap-2">
            <p>Đã có tài khoản?</p>
            <Link to={AppRoutes.LOGIN} className="text-sky-500 hover:underline">
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
