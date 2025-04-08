import { Header } from "@/components";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function ListPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main className="flex-1 lg:px-25 xl:px-50  overflow-y-auto pt-16 ">
        {children}
      </main>
    </div>
  );
}
