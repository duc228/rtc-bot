import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Conversation } from "../../../types/conversation";
import { Link, useParams } from "react-router-dom";

type ChatItemProps = {
  conversation: Conversation;
};

const ChatItem = ({ conversation }: ChatItemProps) => {
  const params = useParams();

  const isCurrentConversation =
    conversation?.id && params?.conversationId === conversation?.id.toString();

  return (
    <Link
      to={`/chat/${conversation.id}`}
      className={`w-full flex items-center gap-2 h-12 rounded-md px-2 hover:bg-slate-200 hover:cursor-pointer ${
        isCurrentConversation ? "bg-slate-200" : ""
      }`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="truncate flex-1 mr-5 text-sm">
        {conversation?.lastMessage || "Null last message"}
      </p>
    </Link>
  );
};

export default ChatItem;
