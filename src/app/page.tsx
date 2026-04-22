import { redirect } from "next/navigation";

import { setNotFirstTime, isFirstTimeUsage } from "@/lib/utils";

export default function Home() {
  return isFirstTimeUsage() ? redirect("/onboard") : setNotFirstTime("/chat");
}
