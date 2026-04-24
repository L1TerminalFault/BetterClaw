import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboard",
}

export default function OnboardLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return children
}
