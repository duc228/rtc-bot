import { Fragment } from "react";
import { Outlet } from "react-router-dom";

type PublicRoutesProps = {};

const PublicRoutes = ({}: PublicRoutesProps) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default PublicRoutes;
