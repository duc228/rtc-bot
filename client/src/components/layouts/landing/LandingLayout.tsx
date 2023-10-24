import { Outlet } from "react-router-dom";
import HeaderLanding from "./Header";

type LandingLayoutProps = {};

const LandingLayout = ({}: LandingLayoutProps) => {
  return (
    <div className="h-min-screen w-full">
      <div className="w-full">
        <HeaderLanding />
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
