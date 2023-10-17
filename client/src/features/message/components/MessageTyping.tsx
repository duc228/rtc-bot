import DotImg from "../../../assets/imgs/three-dot.gif";

type MessageTypingProps = {};

export const MessageTyping = ({}: MessageTypingProps) => {
  return (
    <div className="w-full my-1 flex justify-start">
      <img src={DotImg} className="h-10 w-20" />
    </div>
  );
};

export default MessageTyping;
