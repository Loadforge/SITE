import * as yup from "yup";

export const apiConnectSchema = yup.object({
  apiUri: yup.string().required(), 
  apiToken: yup.string().required(),
  keepConnected: yup.boolean().default(false),
  autoSync: yup.boolean().default(false),
});

export type ApiConnectFormData = yup.InferType<typeof apiConnectSchema>;
