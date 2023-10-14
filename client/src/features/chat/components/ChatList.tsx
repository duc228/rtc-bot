import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatItem from "./ChatItem";

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
  return (
    <div className="h-full overflow-y-auto px-2" id="scrollableDiv">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {items.map((i, index) => (
          <ChatItem key={index} item={` div - #{index}${index}`} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ChatList;
