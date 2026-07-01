import { cn } from "@/lib/utils";

const tones = {
  success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  warning: "border-primary/40 bg-primary/10 text-primary",
  danger: "border-red-400/30 bg-red-400/10 text-red-200",
  muted: "border-muted/30 bg-white/5 text-secondary",
};

export function Badge({
  className,
  tone = "muted",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone], className)} {...props} />;
}
