import EmptyChat from "@/components/EmptyChat";

export default function Chat() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col p-3 max-w-400 w-full h-full">
        <EmptyChat />
      </div>
    </div>
  );
}
