import { Header } from "@/components";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function ListPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex-1 px-50  overflow-y-auto pt-16 mt-20">{children}</main>
    </div>
  );
}
