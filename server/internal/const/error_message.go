package internal

func MsgForTag(tag string, name string) string {
	switch tag {
	case "required":
		return "Vui lòng nhập " + name
	case "email":
		return "Vui lòng nhập đúng email"
	}
	return ""
}
