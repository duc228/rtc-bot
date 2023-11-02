package request

type MessageRequest struct {
	Content        string `json:"content"`
	ConversationId int    `json:"conversationId"`
}
