import { Fragment } from "react";
import { Outlet } from "react-router-dom";

type ProtectedRoutesProps = {};

const ProtectedRoutes = ({}: ProtectedRoutesProps) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default ProtectedRoutes;
