import { Outlet } from "react-router-dom";
import HeaderLanding from "./Header";
import NavbarLanding from "./Navbar";

type LandingLayoutProps = {};

const LandingLayout = ({}: LandingLayoutProps) => {
  return (
    <div className="h-min-screen w-full">
      <div className="w-full">
        <HeaderLanding />
        <NavbarLanding />
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
