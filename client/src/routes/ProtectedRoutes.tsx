import { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { AppRoutes } from "./router";

type ProtectedRoutesProps = {};

const ProtectedRoutes = ({}: ProtectedRoutesProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // return isAuthenticated ? (
  //   <Fragment>
  //     <Outlet />
  //   </Fragment>
  // ) : (
  //   <Navigate to={AppRoutes.LOGIN} />
  // );
  console.log("projtected routes", isAuthenticated);

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default ProtectedRoutes;
