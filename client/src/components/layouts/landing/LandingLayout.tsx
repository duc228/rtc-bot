import { Outlet } from "react-router-dom";
import App from "../../../App";
import HeaderLanding from "./Header";
import NavbarLanding from "./Navbar";
import FooterLanding from "./Footer";

type LandingLayoutProps = {};

export const LandingLayout = ({}: LandingLayoutProps) => {
  return (
    <App>
      <div className="h-min-screen w-full">
        <div className="w-full h-screen flex flex-col">
          <HeaderLanding />
          <NavbarLanding />
          <div className="bg-slate-50 flex-1">
            <Outlet />
          </div>
          <FooterLanding />
        </div>
      </div>
    </App>
  );
};

export default LandingLayout;
