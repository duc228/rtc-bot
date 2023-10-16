import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type MessageInputProps = {};

export const MessageInput = ({}: MessageInputProps) => {
  return (
    <div className="w-full sm:max-w-[800px] bg-white rounded-lg drop-shadow-lg">
      <div className="flex h-12 items-center px-4">
        <input
          placeholder="Send a message..."
          className="block flex-1 h-full focus:outline-none"
        />
        <button>
          <PaperAirplaneIcon className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
