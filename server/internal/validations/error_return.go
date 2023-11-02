package validations

import (
	"fmt"
	internal "rct_server/internal/const"
	"rct_server/internal/dto/response"
	"reflect"

	"github.com/go-playground/validator/v10"
)

func ErrorCustomValidation(err error, data interface{}) []response.ErrorMessageResponse {
	errors := []response.ErrorMessageResponse{}
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
		fmt.Println("ActualTag: ", err.Kind())
		fmt.Println("Type: ", err.Type())
		fmt.Println("Value: ", err.Value())
		fmt.Println("Param: ", err.Param())
		fmt.Println()

		nameFields := reflect.ValueOf(data)
		for i := 0; i < nameFields.NumField(); i++ {
			// fmt.Println(nameFields.Type().Field(i).Name)
			// fmt.Println("\t", nameFields.Field(i))

			if err.Field() == nameFields.Type().Field(i).Name {
				errors = append(errors, response.ErrorMessageResponse{
					Field:   err.Field(),
					Message: internal.MsgForTag(err.Tag(), nameFields.Field(i).Interface().(string)),
				})
			}
		}

	}
	return errors
}
