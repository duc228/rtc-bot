import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth-service";
import { useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

type LoginFormProps = {};

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginForm = ({}: LoginFormProps) => {
  const [message, setMessage] = useState("");

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<LoginInputs>();

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
    <form
      className="w-full flex flex-col gap-4 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        disableUnderline={true}
        placeholder="Email"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input "
        {...register("email")}
      />
      <Input
        placeholder="Mật khẩu"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input "
        type="password"
        {...register("password")}
        disableUnderline={true}
      />
      <button
        type="submit"
        // variant="contained"
        className="btn bg-mainbg text-white hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full "
      >
        <span className="text-[1rem] normal-case">Đăng Nhập</span>
      </button>
      <p className="italic text-red-600 text-sm">{message ? message : ""}</p>
    </form>
  );
};
