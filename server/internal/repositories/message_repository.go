package repositories

import (
	"rct_server/configs"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/request"
	"rct_server/internal/entities"
)

var BotId = internal.BotId

type MessageRepository struct {
}

func (r *MessageRepository) GetPaginationMessagesByConversationId(conversationId int, page int, limit int) ([]entities.Message, error) {
	var messages []entities.Message = make([]entities.Message, 0)
	err := configs.DB.Limit(limit).Offset(page*limit).Order("created_at desc").Where("conversation_id = ?", conversationId).Find(&messages).Error
	return messages, err
}

func (r *MessageRepository) GetTotalRows(conversationId int, page int, limit int) (int64, error) {
	var total int64
	err := configs.DB.Model(&entities.Message{}).Where("conversation_id = ? ", conversationId).Count(&total).Error
	return total, err
}

func (r *MessageRepository) CreateMessage(userId int, request request.MessageRequest) (entities.Message, error) {

	var message entities.Message

	if userId == BotId {
		message = entities.Message{
			Content:        request.Content,
			ConversationId: uint(request.ConversationId),
		}
	} else {
		message = entities.Message{
			UserId:         uint(userId),
			Content:        request.Content,
			ConversationId: uint(request.ConversationId),
		}
	}

	result := configs.DB.Create(&message)
	return message, result.Error
}
