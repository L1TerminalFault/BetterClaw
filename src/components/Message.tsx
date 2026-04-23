import { Message as MessageType } from "ai";

export default function Message({
  message,
}: {
  message: { content: string; role: string }; /*MessageType*/
}) {
  if (message.role === "user")
    return (
      <div className="flex flex-col gap-1.5 w-full items-end">
        <div className="flex px-6 py-3 mr-3 max-w-2/3 rounded-br-sm bg-white/5 overflow-hidden rounded-3xl">
          {message.content}
        </div>
        <div className="p-1.5 rounded-full mr-1 bg-white/4" />
        <div className="p-0.5 rounded-full bg-white/7" />
      </div>
    );
  else
    return (
      <div className="flex flex-col gap-1.5 w-full items-start">
        <div className="flex px-6 py-3 max-w-2/3 ml-3 rounded-bl-sm overflow-hidden bg-orange-300/4 rounded-3xl">
          {message.content}
        </div>
        <div className="p-1.5 rounded-full ml-1 bg-orange-500/5" />
        <div className="p-0.5 rounded-full bg-orange-500/10" />
      </div>
    );
}
