import * as yup from "yup";

export const apiConnectSchema = yup.object({
  apiUri: yup.string().required(), 
  apiToken: yup.string().required(),
});

export type ApiConnectFormData = yup.InferType<typeof apiConnectSchema>;
