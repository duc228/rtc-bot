import { LoginForm } from "../../features/auth/components";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/router";

type LoginPageProps = {};

export const LoginPage = ({}: LoginPageProps) => {
  return (
    <div className="w-full sm:w-[350px] md:w-[440px]">
      <h3 className="font-bold text-black text-3xl text-center">Đăng nhập</h3>
      <div className="mt-8 p-6 rounded-md">
        <LoginForm />
        <div className="flex flex-col w-full items-center mt-4">
          <p className="my-2">Hoặc</p>
          <div className=" flex gap-2">
            <p>Chưa có tài khoản?</p>
            <Link
              to={AppRoutes.SIGNUP}
              className="text-sky-500 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
