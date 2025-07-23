import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWebSocketStore } from "@/contexts/socket/websocketStore";
import { RequestAdvanced } from "@/db/types/advanced.type";
import { RequestAdvancedService } from "@/services/request/advanced.request.service";

interface Props {
  id: string;
}

export function AdvancedReq({ id }: Props) {
  const { setRunTest } = useWebSocketStore();

  const { t } = useTranslation();

  const [advanced, setAdvanced] = useState<RequestAdvanced | null>(null);

  const handleUpdate = (field: keyof RequestAdvanced, value: any) => {
    if (!advanced) return;

    const updated: RequestAdvanced = {
      ...advanced,
      [field]: value,
    };

    setAdvanced(updated);

    RequestAdvancedService.update(updated).catch(() => {
      toast.error(t("errorSave"));
    });
  };

  useEffect(() => {
    RequestAdvancedService.getAdvancedByRequestId(id).then((data) => {
      if (!data) return;
      setAdvanced(data);
    });
  }, [id]);
  
  useEffect(() => {
    if (advanced) {
      setRunTest(advanced.runTest);
    }
  }, [advanced?.runTest, setRunTest]);

  if (!advanced) return null;

  return (
    <div className="space-y-6 p-1 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <Checkbox
          id="run-test"
          checked={advanced.runTest}
          onCheckedChange={(checked) => {
            const value = checked === true;
            handleUpdate("runTest", value);
          }}
        />
        <Label htmlFor="run-test" className="cursor-pointer">
          Executar teste
        </Label>
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="concurrency"
          title="Número de requisições simultâneas que serão feitas ao mesmo tempo."
          className="cursor-help"
        >
          Concurrency
        </Label>
        <Input
          id="concurrency"
          type="number"
          min={1}
          value={advanced.concurrency}
          onChange={(e) => handleUpdate("concurrency", Number(e.target.value))}
          disabled={!advanced.runTest}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label
          htmlFor="duration"
          title="Duração total do teste em segundos (tempo que o teste irá rodar)."
        >
          Duration (seconds)
        </Label>
        <Input
          id="duration"
          type="number"
          min={1}
          value={advanced.duration}
          onChange={(e) => handleUpdate("duration", Number(e.target.value))}
          disabled={!advanced.runTest}
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="timeout-enabled"
          checked={advanced.timeoutEnabled}
          onCheckedChange={(checked) =>
            handleUpdate("timeoutEnabled", checked === true)
          }
          disabled={!advanced.runTest}
        />
        <Label
          htmlFor="timeout-enabled"
          title="Ativa ou desativa o timeout para as requisições."
        >
          Enable Timeout
        </Label>
      </div>

      {advanced.timeoutEnabled && advanced.runTest && (
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="timeout"
            title="Tempo limite em milissegundos para cada requisição ser concluída antes de ser cancelada."
          >
            Timeout (ms)
          </Label>
          <Input
            id="timeout"
            type="number"
            min={1}
            value={advanced.timeout}
            onChange={(e) => handleUpdate("timeout", Number(e.target.value))}
            disabled={!advanced.runTest}
          />
        </div>
      )}
    </div>
  );
}
