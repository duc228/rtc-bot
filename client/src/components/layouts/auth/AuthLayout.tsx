import { Outlet } from "react-router-dom";

type AuthLayoutProps = {};

const AuthLayout = ({}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen  bg-[#edf3f4] flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
