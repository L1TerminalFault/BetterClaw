"use client"

import { Message as MessageType } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LuCopy } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { useState } from "react";

export default function Message({
  message,
}: {
  message: { content: string; role: string }; /*MessageType*/
}) {
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    if (copying) return;
    
    setCopying(true);
      const copyBtn = document.querySelector('#copyable:hover'); 

        if (copyBtn) {
            const textToCopy = copyBtn.innerText;
            await navigator.clipboard.writeText(textToCopy);
        }

    const id = setTimeout(() => {
      setCopying(false);
      clearTimeout(id);
    }, 800)

      // const textToCopy = document.querySelector('#copyable:hover').innerText;

      // alert("copying")
      // await navigator.clipboard.writeText(textToCopy)

      // const id = setTimeout(() => {
      //   setCopying(false);
      //   // clearTimeout(id);
      // }, 500)
  }

  if (message.role === "user")
    return (
      <div className="flex flex-col group gap-1.5 w-full items-end">
      <div id="copyable" className="items-end flex max-w-2/3 flex-col gap-1.5">
        <div className="flex px-6 py-3 mr-3 rounded-br-sm bg-white/5 overflow-hidden rounded-3xl">
	  {message.content}
        </div>
	<div className="flex w-full h-full justify-between items-center">
	<div
	  onClick={handleCopy}
       	  className="pl-4 -translate-y-0.5 p-1 flex hover:opacity-100 opacity-40 transition-all rounded-lg"
	>
	  {copying ? <MdDone className="size-3.5" /> : <LuCopy className="text-white transition-all group-hover:opacity-100 opacity-0 size-3.5" />}
	</div>

	<div className="flex flex-col gap-1.5 w-full items-end">
          <div className="p-1.5 rounded-full mr-1 bg-white/4" />
          <div className="p-0.5 rounded-full bg-white/7" />
	</div>
	</div>
	</div>
      </div>
    );
  else if (message.role === "assistant")
    return (
      <div className="flex flex-col group gap-1.5 w-full items-start pr-9">
      <div id="copyable" className="flex flex-col gap-1.5 items-start max-w-full">
      <div className="pl-3 w-full">
        <div className="flex px-6 py-3 ml-3/ max-w-full rounded-bl-sm overflow-x-auto scrollbar-custom bg-orange-200/4 rounded-3xl">
	<div
	  className="prose prose-slate dark:prose-invert max-w-full"
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
		className="rounded-xl"
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
	</div>

	<div className="flex w-full h-full items-center justify-between">

	  <div className="flex flex-col gap-1.5 items-start">
            <div className="p-1.5 rounded-full ml-1 bg-orange-500/5" />
            <div className="p-0.5 rounded-full bg-orange-500/10" />
	  </div>


	<div
	onClick={handleCopy}
       	className="pr-4 -translate-y-0.5 p-1 flex hover:opacity-100 opacity-40 transition-all rounded-lg">

	  {copying ? <MdDone className="size-3.5" /> : <LuCopy className="text-white transition-all group-hover:opacity-100 opacity-0 size-3.5" />}
	</div>
	</div>
      </div>
      </div>
    );
      else
        return
          <div className="text-white/70 bg-red-500/20 rounded-3xl">{message.content}</div>
}
