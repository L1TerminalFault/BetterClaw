import TopBar from "@/components/TopBar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full h-full">
      <TopBar />
      {children}
    </div>
  );
}
