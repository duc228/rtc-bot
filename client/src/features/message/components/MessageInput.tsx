import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { CHAT_PATH } from "../../../routes/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../../../services/message-service";
import useConversationStore from "../../../stores/useConversationStore";
import { Message } from "../../../types/message";
import useAuthStore from "../../../stores/useAuthStore";

type MessageInputProps = {};

type MessageInput = {
  content: string;
};

export const MessageInput = ({}: MessageInputProps) => {
  const { pathname } = useLocation();
  const isNew = pathname.includes(CHAT_PATH);
  // console.log("pathname", pathname, isNew);
  const { user } = useAuthStore();
  const { setTempMessage, tempMessage, conversationId } =
    useConversationStore();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MessageInput>();

  const { mutate: createMessageMutation, isLoading } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      console.log("onSuccess", data);
      queryClient.invalidateQueries(["messages", conversationId]);
      setTempMessage("");
    },
  });

  const onSubmit = (data: MessageInput) => {
    setTempMessage(data?.content);
    setValue("content", "");
    createMessageMutation({
      content: data.content,
      conversationId: conversationId,
    });
  };

  return (
    <form
      className="w-full sm:max-w-[800px] bg-white rounded-lg drop-shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-12 items-center px-4">
        <input
          autoFocus={true}
          // disabled={!!tempMessage}
          placeholder="Send a message..."
          className={`block flex-1 h-full focus:outline-none `}
          {...register("content")}
        />
        <button type="submit">
          <PaperAirplaneIcon className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </form>
  );
};
