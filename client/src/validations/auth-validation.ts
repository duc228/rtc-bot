import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập email hợp lệ")
    .trim()
    .required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu").trim(),
});

export const SignUpSchema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập email hợp lệ")
    .trim()
    .required("Vui lòng nhập email"),
  fullName: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .min(3, "Họ tên ít nhất 3 kí tự")
    .trim()
    .matches(
      /^[\sa-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹếẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
      "Họ tên không được có số và kí tự đặc biệt"
    ),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .required("Vui lòng nhập mật khẩu")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .test("passwords-match", "Mật khẩu không trùng khớp", function (value) {
      return this.parent.password === value;
    }),
});
