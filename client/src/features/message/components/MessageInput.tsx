import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../../../services/message-service";
import useConversationStore from "../../../stores/useConversationStore";

type MessageInputProps = {};

type MessageInput = {
  content: string;
};

export const MessageInput = ({}: MessageInputProps) => {
  // const { pathname } = useLocation();
  // const { user } = useAuthStore();
  const { setTempMessage, conversationId, setConversationId } =
    useConversationStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<MessageInput>();

  const { mutate: createMessageMutation } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data: any) => {
      console.log("onSuccess", data, conversationId);
      setTempMessage("");

      if (conversationId == -1) {
        setConversationId(data.message.conversationId);
        navigate(`${AppRoutes.CHAT}/${data.message.conversationId}`);
      } else {
        queryClient.invalidateQueries(["messages", conversationId]);
      }
    },
    onError: () => {
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
