import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode}) {

  return (
    <MaxWidthWrapper>
        <div className="w-full flex h-full gap-2">
            <Sidebar />
            {children}
        </div>
    </MaxWidthWrapper>
  );
}