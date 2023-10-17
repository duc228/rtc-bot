import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatItem from "./ChatItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConverastionByUserId } from "../../../services/conversation-service";

type ChatListProps = {};

export const ChatList = ({}: ChatListProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: ({ pageParam }) => {
      return getConverastionByUserId({ page: pageParam, limit: 20 });
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
    <div className="h-full overflow-y-auto px-2" id="scrollableDiv">
      <InfiniteScroll
        dataLength={conversations.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {conversations.map((conversation, index) => (
          <ChatItem key={index} conversation={conversation} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ChatList;
