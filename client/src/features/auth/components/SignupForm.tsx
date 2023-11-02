import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../services/auth-service";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useAuthStore from "../../../stores/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../../../validations";
import toast from "react-hot-toast";

type SignUpProps = {};

interface SignUpInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = ({}: SignUpProps) => {
  const [message, setMessage] = useState("");

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpInputs>({
    resolver: yupResolver(SignUpSchema),
  });

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (data: any) => {
      toast.success("Đăng ký thành công");

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
    signUpMutation({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };
  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        disableUnderline={true}
        placeholder="Họ tên"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input "
        {...register("fullName")}
      />
      {errors.fullName && (
        <p className="text-red-600 text-sm italic">{errors.fullName.message}</p>
      )}
      <Input
        disableUnderline={true}
        placeholder="Email"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input mt-4"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-600 text-sm italic"> {errors.email.message} </p>
      )}
      <Input
        placeholder="Mật khẩu"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input mt-4"
        type="password"
        {...register("password")}
        disableUnderline={true}
      />
      {errors.password && (
        <p className="text-red-600 text-sm italic">{errors.password.message}</p>
      )}
      <Input
        placeholder="Xác nhận mật khẩu"
        className="hover:border-[#e5e7eb] bg-white h-14 px-3 py-2 border rounded-md border-input mt-4"
        type="password"
        {...register("confirmPassword")}
        disableUnderline={true}
      />
      {errors.confirmPassword && (
        <p className="text-red-600 text-sm italic">
          {errors.confirmPassword.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={`${
          isDirty && !isValid ? "opacity-80 cursor-not-allowed" : ""
        } btn bg-mainbg hover:bg-sky-600 rounded-lg hover:shadow-none shadow-none px-4 py-2 w-full gap-2 mt-4`}
      >
        {isLoading ? <CircularProgress color="inherit" size={20} /> : <></>}
        <span className="text-[1rem] normal-case text-white text-center">
          Đăng Ký
        </span>
      </button>
      {message ? (
        <p className="italic text-red-500 text-sm">{message}</p>
      ) : (
        <></>
      )}
    </form>
  );
};

export default SignUpForm;
