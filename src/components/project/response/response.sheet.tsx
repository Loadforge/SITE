import { useRef, useState } from "react";

export function ResponseSheet() {
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
    if (newHeight >= 30 && newHeight <= 600) setHeight(newHeight);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={panelRef}
      className=" bottom-0 left-0 right-0 bg-background"
      style={{ height }}
    >
      <div
        className="h-0.5 cursor-ns-resize bg-separators hover:bg-primary/50"
        onMouseDown={handleMouseDown}
      />
      Teste
    </div>
  );
}
