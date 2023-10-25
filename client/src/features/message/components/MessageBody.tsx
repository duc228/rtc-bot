import { useEffect, useMemo, useRef } from "react";

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { tempMessage, setConversationId, conversationId } =
    useConversationStore();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let id: number = -1;

    if (!params?.conversationId) {
      setConversationId(-1);
    } else {
      id = parseInt(params?.conversationId as string) || -1;
      if (id === -1) {
        navigate(AppRoutes.HOME);
      }
      setConversationId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    // error,
    // isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    enabled: conversationId !== -1,
    queryFn: ({ pageParam }) => {
      return getMessagesByConversationId(conversationId, {
        page: pageParam,
        limit: 20,
      });
    },
    getNextPageParam: (lastPage: any) => {
      // console.log("lastPAge", lastPage);
      if (lastPage?.hasNextPage) {
        return lastPage?.nextPage;
      }
    },
  });

  const messages = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() ?? [];
  }, [data]);

  const scrollToBottom = () => {
    // smooth
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<h4>Loading...</h4>}
      endMessage={<></>}
      scrollableTarget="scrollMessage"
      inverse={true}
      className="flex flex-col-reverse gap-2 sm:w-[800px] mx-auto"
    >
      <div ref={messagesEndRef} />

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
          <MessageItem message={message.content} isBot={!!message.userId} />
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
      <MessageItem message={tempMessage!} isBot={false} />
    </div>
  );
};
