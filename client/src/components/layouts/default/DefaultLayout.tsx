import React from "react";
import { Outlet } from "react-router-dom";

type DefaultLayoutProps = {};

const DefaultLayout = ({}: DefaultLayoutProps) => {
  return (
    <div>
      DefaultLayout
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
