package services

import (
	"fmt"
	"math/rand"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
)

var BotId = internal.BotId

type MessageService struct {
	repo repositories.MessageRepository
}

func (s *MessageService) GetMessagesByConversationId(conversationId int, page int, limit int) ([]entities.Message, error) {
	return s.repo.GetMessagesByConversationId(conversationId, page, limit)
}

func (s *MessageService) GetTotalRows(conversationId int, page int, limit int) (int64, error) {
	return s.repo.GetTotalRows(conversationId, page, limit)
}

func (s *MessageService) CreateMessage(userId int, request request.MessageRequest) (entities.Message, error) {
	var id int = userId
	if userId == BotId {
		id = userId
	}
	return s.repo.CreateMessage(id, request)
}

func (s *MessageService) SendMessageToBot(userId uint, requestMessage request.MessageRequest) response.MessageBotResponse {
	var conversationService ConversationService
	var isNewConversation bool = false
	var conversation entities.Conversation
	if requestMessage.ConversationId == -1 {

		result, err := conversationService.CreateConversation(userId)
		if err != nil {

		}
		conversation = result

	}

	// var conversationId uint = uint(request.ConversationId)
	var conversationId uint = uint(requestMessage.ConversationId)
	if conversation.Id != 0 {
		conversationId = uint(conversation.Id)
		isNewConversation = true

	}

	newMessage, errMessage := s.CreateMessage(int(userId), requestMessage)
	if errMessage != nil {
		fmt.Println("Error creating message: ", errMessage)
	}

	if isNewConversation {
		conversationService.UpdateLastMessageByConversation(int(conversationId), newMessage.Content)
	}

	botResponse := s.CallBot()
	requestMessageBot := request.MessageRequest{
		Content:        botResponse,
		ConversationId: int(conversationId),
	}
	messageBot, errMessageBot := s.CreateMessage(BotId, requestMessageBot)
	if errMessageBot != nil {
		fmt.Println("Error creating message: ", errMessage)
	}

	return response.MessageBotResponse{
		Message:    newMessage,
		MessageBot: messageBot,
	}

}

func (s *MessageService) CallBot() string {
	response := []string{
		"Xin chào, bot vẫn đang trong quá trình phát triển. Vui lòng quay lại sau",
		"Tôi là bot, tôi vẫn đang học",
		"Bot đang bận",
		"Vui lòng quay lại sau",
		"Hiện tại tôi chưa thể trả lời",
		"Bot đang ngủ",
		"Bot chưa thể trả lời bạn",
	}
	randomIndex := rand.Intn(len(response))

	// Get the random string from the array.
	randomString := response[randomIndex]
	return (randomString)

}
