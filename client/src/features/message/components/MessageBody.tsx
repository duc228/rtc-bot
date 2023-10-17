import { useEffect, useMemo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import { Message } from "../../../types/message";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByConversationId } from "../../../services/message-service";
import { MessageTyping } from ".";
import useConversationStore from "../../../stores/useConversationStore";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

type MessageBodyProps = {};

export const MessageBody = ({}: MessageBodyProps) => {
  const { tempMessage, setConversationId, conversationId } =
    useConversationStore();

  const navigate = useNavigate();
  const params = useParams();
  // if (!params?.conversationId) {
  //   navigate(AppRoutes.HOME);
  // } else {
  //   conversationId = parseInt(params?.conversationId) || -1;
  //   if (conversationId === -1) {
  //     navigate(AppRoutes.HOME);
  //   }
  //   // setConversationId(conversationId);
  // }

  useEffect(() => {
    let id: number = -1;

    if (!params?.conversationId) {
      alert("Please params");
      navigate(AppRoutes.HOME);
    } else {
      id = parseInt(params?.conversationId as string) || -1;
      if (id === -1) {
        navigate(AppRoutes.HOME);
      }
      setConversationId(id);
    }
  }, [params]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages", 1],
    enabled: conversationId !== -1,
    queryFn: ({ pageParam }) => {
      return getMessagesByConversationId(conversationId, {
        page: pageParam,
        limit: 20,
      });
    },
    getNextPageParam: (lastPage: any) => {
      console.log("lastPAge", lastPage);
      if (lastPage?.hasNextPage) {
        return lastPage?.nextPage;
      }
    },
  });

  const messages = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() ?? [];
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<h4>Loading...</h4>}
      endMessage={<>end message</>}
      scrollableTarget="scrollMessage"
      inverse={true}
      className="flex flex-col-reverse gap-2 sm:w-[800px] mx-auto"
    >
      {tempMessage ? <MessageTyping /> : <></>}
      {tempMessage ? <MessageTemp /> : <></>}
      {/* <div className="sm:w-[800px]"></div> */}
      {messages.map((message: Message, index: number) => (
        <div
          key={index}
          className={`w-full my-1 flex ${
            !message.userId ? "justify-start" : "justify-end"
          }`}
        >
          <MessageItem message={message.content} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default MessageBody;

export const MessageTemp = () => {
  const { tempMessage } = useConversationStore();
  return (
    <div
      className={`w-full my-1 flex justify-end
  }`}
    >
      <MessageItem message={tempMessage!} />
    </div>
  );
};
