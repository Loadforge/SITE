import * as yup from "yup";

export const requestSchema = yup.object({
  duration: yup.number().required(), 
  status: yup.number().required(),
});

export type RequestFormData = yup.InferType<typeof requestSchema>;
