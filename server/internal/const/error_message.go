package internal

var MsgErr = map[string]string{"abc": "error"}

func MsgForTag(tag string, name string) string {
	switch tag {
	case "required":
		return "Vui lòng nhập " + name
	case "email":
		return "Vui lòng nhập đúng email"
	case "eqfield":
		return name + " không trùng"
	}
	return "Default error message"
}
