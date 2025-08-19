import * as yup from "yup";

export const requestSchema = yup.object({
  duration_ms: yup.number().required(), 
  http_status: yup.number().required(),
});

export type RequestFormData = yup.InferType<typeof requestSchema>;
