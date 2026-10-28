import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zellij-gold text-zellij-navy font-bold",
        secondary:
          "border-zellij-border bg-zellij-surface text-zellij-ivory",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-zellij-ivory border-zellij-border",
        success:
          "border-green-500/30 bg-green-500/10 text-green-400 font-medium",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-300 font-medium",
        gold:
          "border-zellij-gold/40 bg-zellij-goldMuted text-zellij-gold font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
