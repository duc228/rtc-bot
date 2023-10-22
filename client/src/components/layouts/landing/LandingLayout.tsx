import { Outlet } from "react-router-dom";

type LandingLayoutProps = {};

const LandingLayout = ({}: LandingLayoutProps) => {
  return (
    <div>
      <Outlet />
      <div className="h-24 w-24 bg-mainbg"></div>
    </div>
  );
};

export default LandingLayout;
