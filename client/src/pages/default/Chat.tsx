import MessageItem from "../../features/message/components/MessageItem";
import { Message } from "../../types/message";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { MessageBody } from "../../features/message/components";

type ChatPageProps = {};

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
        content: "This is bot" + i,
        isBot: true,
      });
    }
  }
  return arr;
};

const ChatPage = ({}: ChatPageProps) => {
  const [items, setItems] = useState(generateMessage(40));
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (items.length >= 500) {
      setHasMore(false);
      return;
    }
    const arr = generateMessage(40);

    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      //   setItems((prev) => prev.concat(Array.from({ length: 40 })));
      setItems((prev) => [...prev, ...arr]);
    }, 500);
  };
  return (
    <div
      className=" overflow-y-auto mx-auto flex sm:w-[800px] flex-col-reverse gap-2 py-2"
      id="scrollMessage"
    >
      <MessageBody />
    </div>
  );
};

export default ChatPage;
