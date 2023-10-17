import { useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatItem from "./ChatItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getConverastionByUserId } from "../../../services/conversation-service";

type ChatListProps = {};

export const ChatList = ({}: ChatListProps) => {
  const [items, setItems] = useState(Array.from({ length: 40 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((prev) => prev.concat(Array.from({ length: 40 })));
    }, 500);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam }) => {
      console.log("pageProperties", pageParam);
      return getConverastionByUserId({ page: pageParam, limit: 20 });
    },
    getNextPageParam: (lastPage: any, pages) => {
      console.log("lastPAge", lastPage);
      if (lastPage?.hasNextPage) {
        return lastPage?.nextPage;
      }
    },
  });

  const conversations = useMemo(() => {
    return data?.pages.map((page) => page.data).flat() ?? [];
  }, [data]);

  // console.log("data loading", data, conversations);

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
