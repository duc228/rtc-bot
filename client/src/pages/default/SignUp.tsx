import { SignUpForm } from "../../features/auth/components";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/router";

type SignUpPageProps = {};

const SignUpPage = ({}: SignUpPageProps) => {
  return (
    <div className="w-full sm:w-[350px] md:w-[440px]">
      <h3 className="font-bold text-black text-3xl text-center">
        Create your account
      </h3>
      <div className="mt-8 p-6 rounded-md">
        <SignUpForm />
        <div className="flex flex-col w-full items-center mt-4">
          <p className="my-2">Or</p>
          <div className=" flex gap-2">
            <p>Already have an account?</p>
            <Link to={AppRoutes.LOGIN} className="text-sky-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
