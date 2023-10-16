package dto

type Pagination struct {
	Page            int    `json:"page"`
	Limit           int    `json:"limit"`
	Sort            string `json:"sort"`
	Total           int    `json:"total"`
	FirstPage       int    `json:"first_page"`
	LastPage        int    `json:"last_page"`
	PreviousPage    string `json:"previous_page"`
	NextPage        string `json:"next_page"`
	HasNextPage     bool   `json:"has_next_page"`
	HasPreviousPage bool   `json:"has_previous_page"`
	// Searchs      []Search    `json:"searchs"`
}
