import { useForm } from "react-hook-form";
import { Button, Input } from "@mui/material";

type LoginFormProps = {};

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginForm = ({}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = (data: LoginInputs) => {};

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        disableUnderline={true}
        placeholder="Email"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input "
        {...register("email")}
      />
      <Input
        placeholder="Password"
        className="hover:border-[#e5e7eb] bg-white h-12 px-3 py-2 border rounded-md border-input "
        type="password"
        {...register("password")}
        disableUnderline={true}
      />
      <Button
        type="submit"
        variant="contained"
        className="btn bg-sky-400 hover:bg-sky-600 hover:shadow-none shadow-none px-4 py-2 w-full "
      >
        <span className="text-[1rem] normal-case">Login</span>
      </Button>
    </form>
  );
};
