import { useForm, Resolver } from "react-hook-form";
import { Input } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth-service";
import { useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFormProps = {};

interface LoginInputs {
  email: string;
  password: string;
}

const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập email hợp lệ")
    .trim()
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu").trim(),
});

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

  console.log("errors", errors);

  const { mutate: loginMutation } = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      console.log("data return ", data);
      setAccessToken(data?.token);
      navigate(AppRoutes.HOME);
    },
    onError: (error: any) => {
      console.log("error ", error);
      setMessage(error?.error);
    },
  });

  const onSubmit = (data: LoginInputs) => {
    console.log("onSubmit", data);
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
          isDirty && !isValid ? "opacity-80" : ""
        } btn bg-mainbg rounded-md text-white hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full mt-4`}
      >
        <span className="text-[1rem] normal-case">Đăng Nhập</span>
      </button>
      <p className="italic text-red-600 text-sm">{message ? message : ""}</p>
    </form>
  );
};
