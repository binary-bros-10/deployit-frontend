import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn("min-h-28 w-full rounded-md border bg-[#17141b] px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary", className)}
      {...props}
    />
  );
}
