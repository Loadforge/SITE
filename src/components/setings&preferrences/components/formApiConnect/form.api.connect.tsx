import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";
import { connectionStorage } from "@/storages/connectionStorage";
import { apiConnectSchema } from "@/validators";

type FormValues = {
  apiUri: string;
  apiToken: string;
};

type TypeProps = {
  onClose: () => void;
};
export function FormApiConnect({ onClose }: TypeProps) {
  const { t } = useTranslation();
  const [showToken, setShowToken] = useState(false);
  const { isConnected, connect, disconnect } = useWebSocketStore();
  const hasRun = useRef(false);
  const form = useForm<FormValues>({
    resolver: yupResolver(apiConnectSchema),
  });

  useEffect(() => {
    if (!isConnected) return;
    const savedUri = connectionStorage.getUri();
    const savedToken = connectionStorage.getToken();

    form.reset({
      apiUri: savedUri ?? "",
      apiToken: savedToken ?? "",
    });
  }, [form, isConnected]);

  useEffect(() => {
    if (isConnected && hasRun.current) {
      hasRun.current = false;
      onClose();
    }
  }, [isConnected]);

  function onSubmit(values: FormValues) {
    if (!isConnected) {
      connect(values.apiUri, values.apiToken);
      hasRun.current = true;
    } else {
      disconnect();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="apiUri"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="apiUri">API URI</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://example.com"
                  disabled={isConnected}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiToken"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="apiToken">Token</Label>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showToken ? "text" : "password"}
                    placeholder="Seu token secreto"
                    disabled={isConnected}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowToken((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isConnected ? t("disconnecting") : t("connecting")}
        </Button>
      </form>
    </Form>
  );
}
