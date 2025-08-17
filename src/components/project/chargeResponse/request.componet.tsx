interface Props {
  duration: number; 
  status: string;   
}

export function ChargeResquest({ duration, status }: Props) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-border text-sm w-full">
      <span className="text-text font-mono">{duration} ms</span>
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          status.startsWith("2")
            ? "bg-green-100 text-green-700"
            : status.startsWith("4") || status.startsWith("5")
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
