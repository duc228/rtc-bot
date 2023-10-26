import {
  AcademicCapIcon,
  DocumentChartBarIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { ReactElement } from "react";

type Props = {};

type SectionItem = {
  content: string;
  icon: ReactElement;
};

const sectionItems: SectionItem[] = [
  {
    content: "Phương thức tuyển sinh",
    icon: <AcademicCapIcon className="text-mainbg h-20 w-20" />,
  },
  {
    content: "Các ngành đào tạo",
    icon: <DocumentChartBarIcon className="text-mainbg h-20 w-20" />,
  },
  {
    content: "Điểm chuẩn",
    icon: <ArrowTrendingUpIcon className="text-mainbg h-20 w-20" />,
  },
  {
    content: "Học phí",
    icon: <CreditCardIcon className="text-mainbg h-20 w-20" />,
  },
];

export const SectionThree = ({}: Props) => {
  return (
    <div className="w-full">
      <div className="container  w-full lg:max-w-[1024px]">
        {/* <h2 className="text-mainbg text-2xl my-4">Tư vấn đào tạo</h2> */}
        <div className="flex w-full justify-between">
          {sectionItems?.map((item, index) => (
            <SectionThreeItem key={index} section={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

type SectionThreeItemProps = {
  section: SectionItem;
};

export const SectionThreeItem = ({ section }: SectionThreeItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* <img src={section.img} className="md:w-[200px]" /> */}
      {section.icon}
      <p className="font-bold text-xl text-slate-500">{section.content}</p>
    </div>
  );
};
