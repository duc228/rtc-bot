import { useState, useMemo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import { Message } from "../../../types/message";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByConversationId } from "../../../services/message-service";
import { useParams, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/router";

type MessageBodyProps = {};

export const MessageBody = ({}: MessageBodyProps) => {
  const navigate = useNavigate();
  const params = useParams();
  let conversationId: number = -1;
  if (!params?.conversationId) {
    navigate(AppRoutes.HOME);
  } else {
    conversationId = parseInt(params?.conversationId) || -1;
    if (conversationId === -1) {
      navigate(AppRoutes.HOME);
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
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
    <div
      className="overflow-y-auto h-full mx-auto flex sm:w-[800px] flex-col-reverse gap-2 py-2"
      id="scrollMessage"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading...</h4>}
        endMessage={<>end message</>}
        scrollableTarget="scrollMessage"
      >
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
    </div>
  );
};

export default MessageBody;
