import React from "react";
import { Outlet } from "react-router-dom";

type ProtectedRoutesProps = {};

const ProtectedRoutes = ({}: ProtectedRoutesProps) => {
  return (
    <div>
      ProtectedRoutes
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
