import { Outlet } from "react-router-dom";
import HeaderLanding from "./Header";
import NavbarLanding from "./Navbar";
import App from "../../../App";

type HomeLayoutProps = {};

const HomeLayout = ({}: HomeLayoutProps) => {
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

export default HomeLayout;
