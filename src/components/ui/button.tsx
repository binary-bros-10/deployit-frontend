import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-surface shadow-[0_12px_30px_rgba(253,202,0,0.18)] hover:bg-[#f3c000]",
        secondary: "border bg-surface text-foreground hover:border-primary/70",
        ghost: "text-secondary hover:bg-white/5 hover:text-foreground",
        danger: "border border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/15",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild, children, ...props }: ButtonProps) {
  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(buttonVariants({ variant, size, className }), children.props.className),
    });
  }

  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
