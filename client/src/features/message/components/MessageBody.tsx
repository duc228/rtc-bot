import { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import { Message } from "../../../types/message";

type MessageBodyProps = {};

const generateMessage = (n: number) => {
  const arr: Message[] = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 == 0) {
      arr.push({
        content: "This is me" + i,
        isBot: false,
      });
    } else {
      arr.push({
        content:
          "This is bot" +
          i +
          " content longcontent longcontent longcontent longcontent longcontent longcontent longcontent long",
        isBot: true,
      });
    }
  }
  return arr;
};

export const MessageBody = ({}: MessageBodyProps) => {
  const [items, setItems] = useState(generateMessage(40));
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    const arr = generateMessage(40);

    setTimeout(() => {
      setItems((prev) => [...prev, ...arr]);
    }, 500);
  };
  return (
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
      scrollableTarget="scrollMessage"
    >
      {items.map((i: Message, index: number) => (
        <div
          key={index}
          className={`w-full my-1 flex ${
            i.isBot ? "justify-start" : "justify-end"
          }`}
        >
          <MessageItem message={i.content} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default MessageBody;
