import React from "react";
import { LoginForm } from "../../features/auth/components";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/router";

type Props = {};

export const LoginPage = (props: Props) => {
  return (
    <div className="w-full sm:w-[350px] md:w-[440px]">
      <h3 className="font-bold text-black text-3xl text-center">
        Welcome back
      </h3>
      <div className="mt-8 p-6 rounded-md">
        <LoginForm />
        <div className="flex flex-col w-full items-center mt-4">
          <p className="my-2">Or</p>
          <div className=" flex gap-2">
            <p>Don&apos;t have an account?</p>
            <Link
              to={AppRoutes.SIGNUP}
              className="text-sky-500 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
