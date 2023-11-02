import { useForm, Resolver } from "react-hook-form";
import { Input } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth-service";
import { useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../validations";

type LoginFormProps = {};

interface LoginInputs {
  email: string;
  password: string;
}

export const LoginForm = ({}: LoginFormProps) => {
  const [message, setMessage] = useState("");

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      setAccessToken(data?.token);
      navigate(AppRoutes.HOME);
    },
    onError: (error: any) => {
      console.log("error ", error);
      setMessage(error?.error);
    },
  });

  const onSubmit = (data: LoginInputs) => {
    loginMutation(data);
  };

  return (
    <form className="w-full flex flex-col  " onSubmit={handleSubmit(onSubmit)}>
      <Input
        disableUnderline={true}
        placeholder="Email"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input "
        {...register("email")}
      />

      {errors.email && (
        <p className="text-red-600 text-sm italic"> {errors.email.message} </p>
      )}

      <Input
        placeholder="Mật khẩu"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input mt-4"
        type="password"
        {...register("password")}
        disableUnderline={true}
      />

      {errors.password && (
        <p className="text-red-600 text-sm italic">{errors.password.message}</p>
      )}
      <button
        type="submit"
        className={`${
          isDirty && !isValid ? "opacity-80 cursor-not-allowed" : ""
        } btn bg-mainbg rounded-md text-white hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full mt-4`}
      >
        <span className="text-[1rem] normal-case">Đăng Nhập</span>
      </button>
      <p className="italic text-red-600 text-sm">{message ? message : ""}</p>
    </form>
  );
};
