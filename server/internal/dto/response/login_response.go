package response

import "rct_server/internal/entities"

type LoginResponse struct {
	user entities.User
}
