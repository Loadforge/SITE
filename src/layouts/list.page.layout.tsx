import { Header } from "@/components";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function ListPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto p-4 pt-16">{children}</main>
    </div>
  );
}
