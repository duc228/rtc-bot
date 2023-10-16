import { MessageBody } from "../../features/message/components";

type ChatPageProps = {};

const ChatPage = ({}: ChatPageProps) => {
  return (
    <div
      className="overflow-y-auto mx-auto flex sm:w-[800px] flex-col-reverse gap-2 py-2"
      id="scrollMessage"
    >
      <MessageBody />
    </div>
  );
};

export default ChatPage;
