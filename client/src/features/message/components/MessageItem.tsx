type MessageItemProps = {
  message: string;
  isBot: boolean;
};

const MessageItem = ({ message, isBot }: MessageItemProps) => {
  return (
    <div
      className={`${
        !isBot ? "bg-white" : "bg-mainbg"
      } relative w-fit px-3 py-2 rounded-lg max-w-[60%] shadow-md`}
    >
      <span
        className={`text-sm break-all ${isBot ? "text-white" : "text-black"}`}
      >
        {message}
      </span>
      {/* <span className="text-xs text-gray-500 block absolute right-0 bottom-0">
    11:20
  </span> */}
    </div>
  );
};

export default MessageItem;
