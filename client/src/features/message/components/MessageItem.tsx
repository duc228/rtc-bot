type MessageItemProps = {
  message: string;
};

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="bg-white relative w-fit px-3 py-2 rounded-lg max-w-[60%] shadow-md">
      <span className="text-sm work-break">{message}</span>
      {/* <span className="text-xs text-gray-500 block absolute right-0 bottom-0">
    11:20
  </span> */}
    </div>
  );
};

export default MessageItem;
