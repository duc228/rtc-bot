import { NewsItem } from "..";

type NewsListProps = {};

export const NewsList = ({}: NewsListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <NewsItem />
      <NewsItem />
    </div>
  );
};

export default NewsList;
