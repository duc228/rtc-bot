package dto

type BotRequest struct {
	Sender  string `json:"sender"`
	Message string `json:"message"`
}
