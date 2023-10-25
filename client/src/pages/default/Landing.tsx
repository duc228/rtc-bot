import BotImg from "../../assets/imgs/chatbot.png";
import ImgSec2 from "../../assets/imgs/chatbot-faq-example-browser.png";
import { SectionFirstNews } from "../../features/home/components";

type LandingPageProps = {};

const LandingPage = ({}: LandingPageProps) => {
  return (
    <div>
      <section className="flex">
        <div>
          <img src={BotImg} className="ml-10 h-[600px] relative -top-4" />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-[#dd3333] font-bold text-3xl my-10">
            Chatbot hỗ trợ tư vấn tuyển sinh{" "}
          </p>
          <button className="bg-mainbg hover:bg-[#dd3333] text-white px-6 py-2 text-md font-bold rounded-lg">
            Hỗ trợ tư vấn tại đây
          </button>
        </div>
      </section>
      <section className="flex container justify-between">
        <div className="flex-1 pl-10 text-sm">
          <p>
            {" "}
            Emotional Conversation Chatbot SimSimi World first popular Chatbot
            for daily conversation (Service launched in 2002).
          </p>
          <p>
            {" "}
            A unique daily conversation with diversity, fun and vitality.
            Service provided with 130 million sets of daily small talks in 81
            languages compiled through more than 20 million panels.
          </p>
          Service in 81 languages. More than 350 million cumulative users
          worldwide. (Based on June-2018) Records of more than 200 million times
          of responses made per day.
        </div>
        <div className="flex-1 flex justify-center">
          <img src={ImgSec2} className="h-[400px] md:mr-[70px]" />
        </div>
      </section>
      <section className="mt-10">
        <SectionFirstNews />
      </section>
    </div>
  );
};

export default LandingPage;
