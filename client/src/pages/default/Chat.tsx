import { useNavigate, useParams } from "react-router-dom";
import { MessageBody } from "../../features/message/components";
import { AppRoutes } from "../../routes/router";
import useConversationStore from "../../stores/useConversationStore";

type ChatPageProps = {};

const ChatPage = ({}: ChatPageProps) => {
  return (
    <>
      <MessageBody />
    </>
  );
};

export default ChatPage;
