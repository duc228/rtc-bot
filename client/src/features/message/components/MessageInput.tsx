import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../../../services/message-service";
import useConversationStore from "../../../stores/useConversationStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageInputSchema } from "../../../validations";
import { MessageResponse } from "../../../types/message";
import { useEffect, useRef } from "react";

type MessageInputProps = {};

interface MessageInput {
  content: string;
}

export const MessageInput = ({}: MessageInputProps) => {
  // const messageInputRef = useRef<HTMLInputElement | null>(null);

  const { setTempMessage, conversationId, setConversationId } =
    useConversationStore();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isValid },
  } = useForm<MessageInput>({
    resolver: yupResolver(MessageInputSchema),
  });

  const { mutate: createMessageMutation, isLoading } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data: MessageResponse) => {
      setTempMessage("");

      if (conversationId == -1) {
        setConversationId(data.message.conversationId);
        navigate(`${AppRoutes.CHAT}/${data.message.conversationId}`);
      } else {
        queryClient.invalidateQueries(["messages", conversationId]);
      }
      setFocus("content");
    },
    onError: () => {
      setTempMessage("");
    },
  });
  useEffect(() => {
    setFocus("content");
  }, [setFocus]);

  const onSubmit = (data: MessageInput) => {
    setTempMessage(data?.content);
    createMessageMutation({
      content: data.content,
      conversationId: conversationId,
    });
    setValue("content", "");
  };

  return (
    <form
      className="w-full sm:max-w-[800px] bg-white rounded-lg drop-shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-12 items-center px-4">
        <input
          autoFocus={true}
          disabled={!!isLoading}
          placeholder="Nhập nội dung..."
          className={`block flex-1 h-full focus:outline-none `}
          {...register("content")}
        />
        <button type="submit" disabled={!isValid}>
          <PaperAirplaneIcon
            className={`h-4 w-4  ${
              isValid ? "text-red-700" : "text-slate-400"
            }`}
          />
        </button>
      </div>
    </form>
  );
};
