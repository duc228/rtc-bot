package services

import (
	"math"
	"net/http"
	"rct_server/internal/dto/request"
	"rct_server/internal/dto/response"
	"rct_server/internal/entities"
	"rct_server/internal/repositories"
	"rct_server/internal/utils"

	"github.com/gin-gonic/gin"
)

var paginationUtil utils.PaginationUtil

type ConversationService struct {
	repo repositories.ConversationRepository
}

func (s *ConversationService) GetPaginationConversation(userId uint, page int, limit int) ([]entities.Conversation, error) {
	return s.repo.GetPaginationConversation(userId, page, limit)
}

func (s *ConversationService) GetConverastionByUserId(userId uint, request request.PaginationRequest, c *gin.Context) (utils.PaginationResponse, error) {

	// var page int = internal.PAGE
	// var limit int = internal.LIMIT

	// if c.Query("page") != "" {
	// 	page, _ = strconv.Atoi(c.Query("page"))
	// }

	// if c.Query("limit") != "" {
	// 	limit, _ = strconv.Atoi(c.Query("limit"))
	// }

	total, err := s.GetTotalRows(userId, request.Page, request.Limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return utils.PaginationResponse{}, err
	}

	totalPages := int(math.Ceil(float64(total) / float64(request.Limit)))

	data, err := s.GetPaginationConversation(userId, request.Page, request.Limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Đã có lỗi xảy ra ở server")
		return utils.PaginationResponse{}, err

	}

	return paginationUtil.BuildPaginationData(data, request.Page, request.Limit, total, totalPages), err
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
