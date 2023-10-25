import { NewsList } from ".";

type SectionFirstNewsProps = {};

export const SectionFirstNews = ({}: SectionFirstNewsProps) => {
  return (
    <div className="w-full relative">
      <div className="container">
        <div className="grid grid-cols-10 md:gap-8 relative">
          <div className=" col-span-1 md:col-span-7 ">
            <div></div>
            <NewsList />
          </div>
          <div className=" col-span-1 md:col-span-3 ">
            <div className="overflow-visible">gfhgfhgfhgfh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFirstNews;
