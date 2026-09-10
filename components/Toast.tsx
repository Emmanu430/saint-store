import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-3 bg-ivory text-obsidian pl-4 pr-5 py-3.5 shadow-2xl rounded-full border-2 border-burgundy-bright animate-toast-in">
        <CheckCircle2 className="w-5 h-5 text-burgundy-bright shrink-0 animate-pop" />
        <span className="text-sm font-semibold whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}