import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Conversation } from "../../../types/conversation";
import { Link } from "react-router-dom";

type ChatItemProps = {
  conversation: Conversation;
};

const ChatItem = ({ conversation }: ChatItemProps) => {
  return (
    <Link
      to={`/chat/${conversation.id}`}
      className="w-full flex items-center gap-2 h-12 rounded-md px-2 hover:bg-slate-200 hover:cursor-pointer"
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="truncate flex-1 mr-5 text-sm">
        {conversation?.lastMessage?.content || "Null last message"}
      </p>
    </Link>
  );
};

export default ChatItem;
