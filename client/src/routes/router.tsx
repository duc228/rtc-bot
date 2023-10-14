import { lazy } from "react";

// LAYOUTS
const DefaultLayout = lazy(
  () => import("../components/layouts/default/DefaultLayout")
);
const AuthLayout = lazy(() => import("../components/layouts/auth/AuthLayout"));

// DEFAULT PAGES
const LoginPage = lazy(() => import("../pages/default/Login"));
const SignUpPage = lazy(() => import("../pages/default/SignUp"));
const HomePage = lazy(() => import("../pages/default/Home"));

export const AppRoutes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
  CHAT: "/chat",
};

export const routes = [
  {
    protected: false,
    element: <AuthLayout />,
    children: [
      {
        path: AppRoutes.LOGIN,
        element: <LoginPage />,
      },
      {
        path: AppRoutes.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
  {
    protected: true,
    element: <DefaultLayout />,
    children: [{ path: AppRoutes.HOME, element: <HomePage /> }],
  },
];