import { Header } from "@/components";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function ListPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex-1 lg:px-15 xl:px-30  overflow-y-auto pt-10 ">
        {children}
      </main>
    </div>
  );
}
