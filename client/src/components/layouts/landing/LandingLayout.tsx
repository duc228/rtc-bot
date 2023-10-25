import { Outlet } from "react-router-dom";
import App from "../../../App";
import HeaderLanding from "./Header";
import NavbarLanding from "./Navbar";

type LandingLayoutProps = {};

export const LandingLayout = ({}: LandingLayoutProps) => {
  return (
    <App>
      <div className="h-min-screen w-full">
        <div className="w-full h-full">
          <HeaderLanding />
          <NavbarLanding />
          <Outlet />
        </div>
      </div>
    </App>
  );
};

export default LandingLayout;
