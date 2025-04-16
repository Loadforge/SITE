import { useRef, useState } from "react";

export function ResponseSheet({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(300);

  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !panelRef.current) return;
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight >= 150 && newHeight <= 600) setHeight(newHeight);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800"
      style={{ height }}
    >
      <div
        className="h-2 cursor-ns-resize bg-zinc-700 hover:bg-zinc-600"
        onMouseDown={handleMouseDown}
      />
      <div className="h-full overflow-auto p-4 text-white">{children}</div>
    </div>
  );
}
