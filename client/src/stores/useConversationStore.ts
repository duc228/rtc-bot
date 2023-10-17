import { create } from "zustand";

interface ConversationState {
  conversationId: number;
  isTyping: boolean;
  tempMessage: string | undefined;
  setConversationId: (value: number) => void;
  setIsTyping: (value: boolean) => void;
  setTempMessage: (value: string | undefined) => void;
}

const useConversationStore = create<ConversationState>()((set) => ({
  conversationId: -1,
  isTyping: false,
  tempMessage: "",
  setConversationId(id: number) {
    set((state) => ({
      ...state,
      conversationId: id,
    }));
  },
  setIsTyping(value: boolean) {
    set((state) => ({
      ...state,
      isTyping: value,
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
