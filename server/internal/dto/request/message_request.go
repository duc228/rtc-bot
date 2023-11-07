package request

type MessageRequest struct {
	Content        string `json:"content" validate:"required" errormgs:"Nội dung tin nhắn"`
	ConversationId int    `json:"conversationId" validate:"required,number,min=-1" errormgs:"Mã đoạn chat"`
}

type GetMessagesRequest struct {
	ConversationId int `uri:"conversationId" json:"conversationId" validate:"required,number,min=-1" errormgs:"Mã đoạn chat"`
}
