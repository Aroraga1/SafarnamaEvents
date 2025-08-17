import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default badge: Logo ke dark blue color se background
        default:
          "border-transparent bg-[#2c3e50] text-white hover:bg-[#34495e]",
        // Secondary badge: Logo ke orange color se background
        secondary:
          "border-transparent bg-[#f39c12] text-white hover:bg-[#ffffff ]",
        // Destructive badge: Standard red color, no change needed
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline badge: Light border aur text color logo ke dark blue se, hover par copper
        outline:
          "border-gray-300 text-[#2c3e50] hover:bg-gray-100 hover:text-[#b85c38]",
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
