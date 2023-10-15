import { useForm } from "react-hook-form";
import { Button, Input } from "@mui/material";

type SignUpProps = {};

type SignUpInputs = {
  email: string;
  password: string;
  fullName: string;
};

export const SignUpForm = ({}: SignUpProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit = (data: SignUpInputs) => {
    console.log("data login", data);
  };
  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        disableUnderline={true}
        placeholder="Full Name"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input "
        {...register("fullName")}
      />
      <Input
        disableUnderline={true}
        placeholder="Email"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input "
        {...register("email")}
      />
      <Input
        placeholder="Password"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input "
        type="password"
        {...register("password")}
        disableUnderline={true}
      />
      <Button
        type="submit"
        variant="contained"
        className="btn bg-sky-500 hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full normal-case"
      >
        <span className="text-[1rem]">Sign Up</span>
      </Button>
    </form>
  );
};

export default SignUpForm;
function setAccessToken(token: any) {
  throw new Error("Function not implemented.");
}
