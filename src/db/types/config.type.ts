export interface ConfigTest {
  id?: string;
  requestId?: string;
  concurrency: number;
  duration: number;
  hardwareInfos: HardwareInfos;
}

export interface HardwareInfos {
  cpu_cores: number;
  free_ram_mb: number;
  total_ram_mb: number;
}
