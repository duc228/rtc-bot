import ImgSec2 from "../../../assets/imgs/chatbot-faq-example-browser.png";

type Props = {};

export const SectionTwo = (props: Props) => {
  return (
    <>
      <div className="flex-1 pl-20 text-md ">
        <div className="max-w-[100%] mt-5 flex flex-col gap-4">
          <p>
            Emotional Conversation Chatbot SimSimi World first popular Chatbot
            for daily conversation (Service launched in 2002).
          </p>
          <p>A unique daily conversation with diversity, fun and vitality.</p>
          <p>
            Service provided with 130 million sets of daily small talks in 81
            languages compiled through more than 20 million panels.
          </p>
          <p>
            Service in 81 languages. More than 350 million cumulative users
            worldwide. (Based on June-2018) Records of more than 200 million
            times of responses made per day.
          </p>
        </div>
        <div className="mt-4">
          <p>
            State-of-the-art open-core Conversational AI framework for
            Enterprises that natively leverage generative AI for effortless
            assistant development. Rasa Pro enables deeply nuanced conversations
            with end customers by following business logic safely and
            predictably in the deployment environment of your choice. It has
            been built and tested to effectively respond to enterprise needs for
            security, observability and scalability.
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center ">
        <img src={ImgSec2} className="h-[500px] md:mr-[70px] ml-[60px]" />
      </div>
    </>
  );
};

export default SectionTwo;
