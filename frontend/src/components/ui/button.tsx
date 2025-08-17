import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default button color matching the logo's deep blue
        default: "bg-[#2c3e50] text-white hover:bg-[#34495e]",
        // Destructive button remains a standard destructive color
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Outline button with a border and hover effect aligned with the new theme
        outline:
          "border border-gray-300 bg-background text-[#2c3e50] hover:bg-gray-100 hover:text-[#b85c38]",
        // Secondary button using the brand's accent orange
        secondary: "bg-[#f39c12] text-white hover:bg-[#e67e22]",
        // Ghost button with a subtle hover effect
        ghost: "hover:bg-gray-100 hover:text-[#b85c38]",
        // Link button remains standard
        link: "text-primary underline-offset-4 hover:underline",
        // Main call-to-action button with a gradient from the logo
        adventure:
          "bg-gradient-to-r from-[#b85c38] to-[#f39c12] text-white font-semibold hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-300",
        // Sunset button using the logo's sunset gradient
        sunset:
          "bg-gradient-to-r from-[#f1c40f] to-[#e67e22] text-white font-semibold hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-300",
        // Other custom variants removed for a cleaner, consistent look
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
