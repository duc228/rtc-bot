type DefaultChatProps = {};

export const DefaultChat = ({}: DefaultChatProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <button onClick={() => {}} className="btn bg-red-200">
          temp
        </button>
        <p>This is guide for using bot is still being written</p>
        <p>Typing message on input box and enter to start interacting</p>
      </div>
    </div>
  );
};

export default DefaultChat;
