package services

import (
	"math"
	"net/http"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/response"
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
	"rct_server/internal/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

var paginationUtil utils.PaginationUtil

type ConversationService struct {
	repo repositories.ConversationRepository
}

func (s *ConversationService) GetPaginationConversation(userId uint, page int, limit int) ([]entities.Conversation, error) {
	return s.repo.GetPaginationConversation(userId, page, limit)
}

func (s *ConversationService) GetConverastionByUserId(userId uint, c *gin.Context) (response.PaginationResponse, error) {

	var page int = internal.PAGE
	var limit int = internal.LIMIT

	if c.Query("page") != "" {
		page, _ = strconv.Atoi(c.Query("page"))
	}

	if c.Query("limit") != "" {
		limit, _ = strconv.Atoi(c.Query("limit"))
	}

	total, err := s.GetTotalRows(userId, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return response.PaginationResponse{}, err
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	data, err := s.GetPaginationConversation(userId, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return response.PaginationResponse{}, err

	}

	return paginationUtil.BuildPaginationData(data, page, limit, total, totalPages), err
}

func (s *ConversationService) GetTotalRows(userId uint, page int, limit int) (int64, error) {
	return s.repo.GetTotalRows(userId, page, limit)
}

func (s *ConversationService) CreateConversation(userId uint) (entities.Conversation, error) {
	return s.repo.CreateConversation(userId)
}

func (s *ConversationService) UpdateLastMessageByConversation(conversationId int, content string) (entities.Conversation, error) {
	return s.repo.UpdateLastMessageByConversation(conversationId, content)
}
