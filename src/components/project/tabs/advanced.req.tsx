import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdvancedReq() {
  const [runTest, setRunTest] = useState(false);
  const [concurrency, setConcurrency] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [timeoutEnabled, setTimeoutEnabled] = useState(false);
  const [timeout, setTimeoutValue] = useState<number>(30000);

  const handleTimeoutChange = (value: string) => {
    const num = Number(value);
    if (isNaN(num) || num < 1) return;
    setTimeoutValue(num);
  };

  return (
    <>
      <div className="space-y-6 p-1 w-full max-w-sm">
        <div className="flex items-center gap-3">
          <Checkbox
            id="run-test"
            checked={runTest}
            onCheckedChange={(checked) => setRunTest(checked === true)}
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
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            disabled={!runTest}
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
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={!runTest}
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="timeout-enabled"
            checked={timeoutEnabled}
            onCheckedChange={(checked) => setTimeoutEnabled(checked === true)}
            disabled={!runTest}
          />
          <Label
            htmlFor="timeout-enabled"
            title="Ativa ou desativa o timeout para as requisições."
          >
            Enable Timeout
          </Label>
        </div>

        {timeoutEnabled && runTest && (
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
              value={timeout}
              onChange={(e) => handleTimeoutChange(e.target.value)}
              disabled={!runTest}
            />
          </div>
        )}
      </div>
    </>
  );
}
