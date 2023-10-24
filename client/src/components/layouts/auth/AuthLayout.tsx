import { Outlet } from "react-router-dom";

type AuthLayoutProps = {};

const AuthLayout = ({}: AuthLayoutProps) => {
  // <div className="min-h-screen bg-[#edf3f4] flex flex-col items-center justify-center">

  return (
    <div className="  bg-[#edf3f4] flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
