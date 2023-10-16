import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { AppRoutes, CHAT_PATH } from "../../../routes/router";

type MessageInputProps = {};

type MessageInput = {
  content: string;
};

export const MessageInput = ({}: MessageInputProps) => {
  const { pathname } = useLocation();
  const isNew = pathname.includes(CHAT_PATH);
  console.log("pathname", pathname, isNew);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MessageInput>();

  const onSubmit = (data: MessageInput) => {
    console.log("onSubmit", data);
    setValue("content", "");
  };
  return (
    <form
      className="w-full sm:max-w-[800px] bg-white rounded-lg drop-shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-12 items-center px-4">
        <input
          placeholder="Send a message..."
          className="block flex-1 h-full focus:outline-none"
          {...register("content")}
        />
        <button type="submit">
          <PaperAirplaneIcon className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </form>
  );
};
