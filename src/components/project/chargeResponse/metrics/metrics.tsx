import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { HttpStatuBadge } from "@/components/badge/http.badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebSocketStore } from "@/contexts/socket/websocketStore";
import { Request } from "@/db/types";
import { MetricsTest } from "@/db/types/metrics.type";
import { RequestMetricsTestService } from "@/services/request/metrics.request.service";

interface Props {
  selectedRequest?: Request;
}

export function Metrics({ selectedRequest }: Props) {
  const { test } = useWebSocketStore();
  const [metrics, setMetrics] = useState<MetricsTest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!selectedRequest?.id) return;
      
      setIsLoading(true);
      try {
        const metricsData = await RequestMetricsTestService.getMetricsTestByRequestId(
          selectedRequest.id
        );
        setMetrics(metricsData);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedRequest, test]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando métricas...</span>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Nenhuma métrica disponível para esta requisição.
      </div>
    );
  }

  const formatNumber = (num?: number, decimals = 2) => {
    if (num === undefined || num === null) return '0';
    return num.toFixed(decimals);
  };

  const errorRate = metrics.failed_requests / metrics.total_requests * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tempo Médio (ms)
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(metrics.median_response_ms)}</div>
          <p className="text-xs text-muted-foreground">
            Mediana do tempo de resposta
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Requisições/s
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(metrics.throughput_rps)}</div>
          <p className="text-xs text-muted-foreground">
            Taxa de transferência (requisições/segundo)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(errorRate, 1)}%</div>
          <p className="text-xs text-muted-foreground">
            Porcentagem de requisições com erro
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Requisições</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.total_requests}</div>
          <p className="text-xs text-muted-foreground">
            Número total de requisições
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tempos de Resposta (ms)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mais rápido:</span>
              <span className="font-medium">{formatNumber(metrics.fastest_response_ms)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mediana:</span>
              <span className="font-medium">{formatNumber(metrics.median_response_ms)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mais lento:</span>
              <span className="font-medium">{formatNumber(metrics.slowest_response_ms)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {metrics.status_counts && Object.keys(metrics.status_counts).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Códigos de Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(metrics.status_counts).map(([status, count]) => (
                <div key={status} className="flex justify-between">
                  <HttpStatuBadge code={Number(status)} />:
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
