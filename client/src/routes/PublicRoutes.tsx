import { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { AppRoutes } from "./router";

type PublicRoutesProps = {};

const PublicRoutes = ({}: PublicRoutesProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return !isAuthenticated ? (
    <Fragment>
      <Outlet />
    </Fragment>
  ) : (
    <Navigate to={AppRoutes.HOME} />
  );
};

export default PublicRoutes;
