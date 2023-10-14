import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { routes } from "./router";

type RenderRoutesProps = {};

const RenderRoutes = ({}: RenderRoutesProps) => {
  const publicRoutes: any = { element: <PublicRoutes />, children: [] };
  const protectedRoutes: any = { element: <ProtectedRoutes />, children: [] };

  routes.map((item: any) => {
    if (item.protected) {
      protectedRoutes.children.push(item);
    } else {
      publicRoutes.children.push(item);
    }
  });

  const router = createBrowserRouter([publicRoutes, protectedRoutes]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default RenderRoutes;
