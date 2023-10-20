import { lazy } from "react";

// LAYOUTS
const DefaultLayout = lazy(
  () => import("../components/layouts/default/DefaultLayout")
);
const AuthLayout = lazy(() => import("../components/layouts/auth/AuthLayout"));
const LandingLayout = lazy(
  () => import("../components/layouts/landing/LandingLayout")
);

// DEFAULT PAGES
const LoginPage = lazy(() => import("../pages/default/Login"));
const SignUpPage = lazy(() => import("../pages/default/SignUp"));
const HomePage = lazy(() => import("../pages/default/Home"));
const ChatPage = lazy(() => import("../pages/default/Chat"));

export const CHAT_PATH = "/chat";

export const AppRoutes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
  CHAT: "/chat",
  CHAT_SLUG: `${CHAT_PATH}/:conversationId`,
};

export const routes = [
  {
    protected: false,
    isLangding: false,
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
    isLangding: true,
    protected: false,
    element: <LandingLayout />,
    children: [{ path: AppRoutes.HOME, element: <HomePage /> }],
  },
  {
    isLangding: false,
    protected: true,
    element: <DefaultLayout />,
    children: [
      { path: AppRoutes.CHAT_SLUG, element: <ChatPage /> },
      { path: AppRoutes.CHAT, element: <ChatPage /> },
    ],
  },
];
