import * as yup from "yup";

export const MessageInputSchema = yup.object({
  content: yup.string().required().trim(),
});
