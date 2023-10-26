import { Link } from "react-router-dom";
import BotImg from "../../../assets/imgs/chatbot.png";
import useAuthStore from "../../../stores/useAuthStore";
import { AppRoutes } from "../../../routes/router";

type Props = {};

export const SectionOne = ({}: Props) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <div>
        <img src={BotImg} className="ml-10 h-[600px] relative -top-4" />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <p className="text-[#dd3333] font-bold text-3xl my-10">
          Chatbot hỗ trợ tư vấn tuyển sinh
        </p>
        <Link
          to={isAuthenticated ? AppRoutes.CHAT : AppRoutes.LOGIN}
          className="bg-mainbg hover:bg-[#dd3333] text-white px-6 py-2 text-md font-bold rounded-lg"
        >
          Hỗ trợ tư vấn tại đây
        </Link>
      </div>
    </>
  );
};

export default SectionOne;
