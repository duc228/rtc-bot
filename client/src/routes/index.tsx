import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { routes } from "./router";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<h1>Loading 99%...</h1>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
};

export default RenderRoutes;
