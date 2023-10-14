import React from "react";
import { Outlet } from "react-router-dom";

type PublicRoutesProps = {};

const PublicRoutes = ({}: PublicRoutesProps) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
