import { useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatItem from "./ChatItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConverastionByUserId } from "../../../services/conversation-service";
import useConversationStore from "../../../stores/useConversationStore";

type ChatListProps = {};

export const ChatList = ({}: ChatListProps) => {
  const { conversationId } = useConversationStore();

  useEffect(() => {
    if (conversationId !== -1) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    // error,
    // isFetching,
    // isFetchingNextPage,
    // status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam }) => {
      const page = pageParam || 0;
      return getConverastionByUserId({ page: page, limit: 20 });
    },
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.hasNextPage) {
        return lastPage?.nextPage;
      }
    },
  });

  const conversations = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() ?? [];
  }, [data]);

  return (
    <div
      className="h-full flex flex-col-reverse overflow-y-auto px-2"
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={conversations.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b></b>
          </p>
        }
        scrollableTarget="scrollableDiv"
        // className="flex flex-col-reverse"
      >
        {conversations.map((conversation, index) => (
          <ChatItem key={index} conversation={conversation} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ChatList;
