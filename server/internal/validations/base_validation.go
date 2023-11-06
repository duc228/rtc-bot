package validations

import (
	"fmt"
	"net/http"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/response"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

const tagCustom = "errormgs"

func ValidationParams(c *gin.Context, data interface{}) bool {
	validate = validator.New()

	errors := []response.IError{}

	err := validate.Struct(data)

	if err != nil {

		errors = ErrorCustomValidation(err, data)
		response.Error(c, http.StatusBadRequest, errors)
		return false
	}
	return true
}

func ErrorCustomValidation(err error, data interface{}) []response.IError {
	errors := []response.IError{}
	if _, ok := err.(*validator.InvalidValidationError); ok {
		fmt.Println(err)
		// return errors
	}

	for _, err := range err.(validator.ValidationErrors) {

		fmt.Println("Namespace: ", err.Namespace())
		fmt.Println("Field: ", err.Field())
		fmt.Println("StructNamespace: ", err.StructNamespace())
		fmt.Println("StructField: ", err.StructField())
		fmt.Println("Tag: ", err.Tag())
		fmt.Println("ActualTag: ", err.ActualTag())
		fmt.Println("Kind: ", err.Kind())
		fmt.Println("Type: ", err.Type())
		fmt.Println("Value: ", err.Value())
		fmt.Println("Param: ", err.Param())
		fmt.Println("Error: ", err.Error())
		fmt.Println()

		nameFields := reflect.ValueOf(data)
		for i := 0; i < nameFields.NumField(); i++ {
			// fmt.Print(nameFields.Type().Field(i).Name)
			// fmt.Println(" \t", nameFields.Field(i))

			if err.Field() == nameFields.Type().Field(i).Name {
				// var msg string = ""
				// if nameFields.Type().Field(i).Tag.Get(tagCustom) != "" {
				// 	msg = nameFields.Type().Field(i).Tag.Get(tagCustom)
				// } else {
				// 	msg = internal.MsgForTag(err.Tag(), nameFields.Field(i).Interface().(string))
				// }

				var nameField string = ""
				if nameFields.Type().Field(i).Tag.Get(tagCustom) != "" {
					nameField = nameFields.Type().Field(i).Tag.Get(tagCustom)
				} else {
					nameField = err.Field()
				}
				errors = append(errors, response.IError{
					Field:   err.Field(),
					Message: internal.MsgForTag(err.Tag(), nameField),
					// Message: msg,
				})
			}
		}

	}
	return errors
}
