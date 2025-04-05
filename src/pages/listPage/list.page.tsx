import { Button } from "@/components/ui/button";

export function ListPage() {
  return (
    <div className="flex bg-background items-center gap-2 justify-center min-h-svh">
      <Button className="bg-background text-white hover:opacity-90">Background</Button>
      <Button className="bg-fill text-white hover:opacity-90">Fill</Button>
      <Button className="bg-primary text-black hover:opacity-90">Primary</Button>
      <Button className="bg-secondary text-white hover:opacity-90">Secondary</Button>
      <Button className="bg-accent text-white hover:opacity-90">Accent</Button>
      <Button className="bg-muted text-white hover:opacity-90">Muted</Button>
    </div>
  );
}
