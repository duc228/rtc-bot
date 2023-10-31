import { create } from "zustand";

interface ConversationState {
  conversationId: number;
  tempMessage: string | undefined;
  setConversationId: (value: number) => void;
  setTempMessage: (value: string | undefined) => void;
}

const useConversationStore = create<ConversationState>()((set) => ({
  conversationId: -1,
  tempMessage: "",
  setConversationId(id: number) {
    set((state) => ({
      ...state,
      conversationId: id,
    }));
  },
  setTempMessage(value: string | undefined) {
    set((state) => ({
      ...state,
      tempMessage: value,
    }));
  },
}));

export default useConversationStore;
