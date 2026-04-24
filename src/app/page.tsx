"use client"

import { redirect } from "next/navigation";
import { GiCrabClaw } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true)
    const redirectTimeout = setTimeout(() => redirect("/onboard"), 3000);

    return () => clearTimeout(redirectTimeout);
  }, [])

  return (
    <div className={`transition-all w-full h-full gap-6 flex bg-white/0 items-center justify-center`}>
    <div className={`${animate ? "scale-100 opacity-100" : "scale-200 opacity-0"} duration-1500 transition-all flex gap-6 items-center justify-center`}>
      <GiCrabClaw className={`${animate ? "text-orange-700" : "text-orange-500"} delay-2000 duration-1000 transition-all icon size-30`} />
      <div className={`${animate ? "max-w-100" : "max-w-0"} overflow-hidden delay-1000 duration-1000 transition-all whole-text text-gray-400 text-6xl`}>Better<span className={`${animate ? "text-orange-600" : ""} delay-2000 duration-700 span-text transition-all`}>Claw</span></div>
      </div>
    </div>
  )
}
