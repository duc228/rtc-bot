import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

type ChatItemProps = {
  item: any;
};

const ChatItem = ({ item }: ChatItemProps) => {
  return (
    <div className="w-full flex items-center gap-2 h-12 rounded-md px-2 hover:bg-slate-200 hover:cursor-pointer">
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="truncate flex-1 mr-5 text-sm">{item}</p>
    </div>
  );
};

export default ChatItem;
