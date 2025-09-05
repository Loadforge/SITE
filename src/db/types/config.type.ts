export interface ConfigTest {
  id?: string;
  requestId: string;
  concurrency: number;
  duration: number;
  hardware_info: HardwareInfos;
}

export interface HardwareInfos {
  cpu_cores: number;
  free_ram_mb: number;
  total_ram_mb: number;
}
