import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiConnectFormData, apiConnectSchema } from "@/validators";

export function FormApiConnect() {
  const [showToken, setShowToken] = useState(false);

  const form = useForm<ApiConnectFormData>({
    resolver: yupResolver(apiConnectSchema),
    defaultValues: {
      apiUri: "https://localhost:8080/",
      apiToken: "token",
    },
  });

  function onSubmit(values: ApiConnectFormData) {
    console.log("Dados enviados:", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-text p-1"
      >
        <FormField
          control={form.control}
          name="apiUri"
          render={({ field }) => (
            <FormItem className="gap-5">
              <FormLabel className="text-lg font-bold">Api URI</FormLabel>
              <FormControl>
                <Input {...field} className="w-3/4 border-separators/50" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiToken"
          render={({ field }) => (
            <FormItem className="gap-5">
              <FormLabel className="text-lg font-bold">Api Token</FormLabel>
              <div className="relative w-3/4">
                <FormControl>
                  <Input
                    {...field}
                    className="pr-10 border-separators/50"
                    type={showToken ? "text" : "password"}
                  />
                </FormControl>
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-primary"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
