package services

import (
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
)

type ConversationService struct {
	repo repositories.ConversationRepository
}

func (s *ConversationService) GetConverastionByUserId(userId uint, page int, limit int) ([]entities.Conversation, error) {
	return s.repo.GetConverastionByUserId(userId, page, limit)
}

func (s *ConversationService) GetTotalRows(userId uint, page int, limit int) (int64, error) {
	return s.repo.GetTotalRows(userId, page, limit)
}

func (s *ConversationService) CreateConversation(userId uint) (entities.Conversation, error) {
	return s.repo.CreateConversation(userId)
}
