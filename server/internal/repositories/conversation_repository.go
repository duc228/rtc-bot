package repositories

import (
	"rct_server/configs"
	"rct_server/internal/entities"
)

type ConversationRepository struct {
}

func (r *ConversationRepository) GetPaginationConversation(userId uint, page int, limit int) ([]entities.Conversation, error) {
	var conversations []entities.Conversation = make([]entities.Conversation, 0)
	err := configs.DB.Limit(limit).Offset(page*limit).Order("updated_at desc").Where("user_id = ?", userId).Find(&conversations).Error
	return conversations, err
}

func (r *ConversationRepository) GetTotalRows(userId uint, page int, limit int) (int64, error) {
	var total int64
	err := configs.DB.Model(&entities.Conversation{}).Where("user_id = ?", userId).Count(&total).Error

	return total, err
}

func (r *ConversationRepository) CreateConversation(userId uint) (entities.Conversation, error) {
	conversation := entities.Conversation{
		UserId: userId,
	}

	result := configs.DB.Create(&conversation)
	return conversation, result.Error

}

func (r *ConversationRepository) UpdateLastMessageByConversation(conversationId int, content string) (entities.Conversation, error) {
	var conversation entities.Conversation
	query := configs.DB.Where("id = ? ", conversationId)
	err := query.Model(&entities.Conversation{}).Update("last_message", content).Error
	query.Find(&conversation)
	return conversation, err
}
