import SideBar from "@/components/SideBar";
import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex gap-4 w-full h-full">
      <SideBar />
      {children}
    </div>
  );
}
