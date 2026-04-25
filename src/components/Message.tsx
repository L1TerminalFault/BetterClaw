import { Message as MessageType } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  else if (message.role === "assistant")
    return (
      <div className="flex flex-col gap-1.5 w-full items-start">
        <div className="flex px-6 py-3 max-w-5/6 ml-3 rounded-bl-sm overflow-x-auto scrollbar-custom bg-orange-300/4 rounded-3xl">
	<div
	  className="prose prose-slate dark:prose-invert max-w-none"
	>
	<ReactMarkdown
	  remarkPlugins={[remarkGfm]}
	  components={{
        // This function runs for every <code> tag found in the markdown
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          // 1. If it's a code block with a language (e.g., ```js)
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }

          // 2. If it's just `inline code` or a block without a language
          return (
            <code className="bg-gray-200 dark:bg-gray-800 rounded px-1" {...props}>
              {children}
            </code>
          );
        },
      }}
	  >
          {message.content}
	  </ReactMarkdown>
	  </div>
        </div>
        <div className="p-1.5 rounded-full ml-1 bg-orange-500/5" />
        <div className="p-0.5 rounded-full bg-orange-500/10" />
      </div>
    );
      else
        return
          <div className="text-white/70 bg-red-500/20 rounded-3xl">{message.content}</div>
}
