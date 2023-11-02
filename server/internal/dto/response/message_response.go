package response

import "rct_server/internal/entities"

type MessageBotResponse struct {
	Message    entities.Message `json:"message"`
	MessageBot entities.Message `json:"messageBot"`
}
