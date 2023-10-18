import { useForm } from "react-hook-form";
import { Button, Input } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../services/auth-service";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useAuthStore from "../../../stores/useAuthStore";

type SignUpProps = {};

type SignUpInputs = {
  email: string;
  password: string;
  fullName: string;
};

export const SignUpForm = ({}: SignUpProps) => {
  const [message, setMessage] = useState("");

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const { register, handleSubmit } = useForm<SignUpInputs>();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (data: any) => {
      console.log("data sign up ", data);
      if (data?.token) {
        setAccessToken(data?.token);
      }
    },
    onError: (data: any) => {
      console.log("error: ", data);
      setMessage(data?.error);
    },
  });

  const onSubmit = (data: SignUpInputs) => {
    console.log("data login", data);
    signUpMutation({
      full_name: data.fullName,
      email: data.email,
      password: data.password,
    });
    // signUpMutation(data);
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
        disabled={isLoading}
        className="btn bg-sky-500 hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full flex items-center gap-2"
      >
        {isLoading ? <CircularProgress color="inherit" size={20} /> : <></>}
        <span className="text-[1rem] normal-case">Sign Up</span>
      </Button>
      {message ? (
        <p className="italic text-red-500 text-sm">{message}</p>
      ) : (
        <></>
      )}
    </form>
  );
};

export default SignUpForm;
