package request

type MessageRequest struct {
	Content        string `json:"content" validate:"required"`
	ConversationId int    `json:"conversationId"`
}
