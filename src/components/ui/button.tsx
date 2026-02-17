import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] touch-manipulation",
    {
        variants: {
            variant: {
                default: "bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:ring-cyan-500",
                outline: "border border-cyan-500/50 bg-transparent text-cyan-400 hover:bg-cyan-500/10",
                ghost: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
            },
            size: {
                sm: "h-9 px-3 min-h-[44px] sm:min-h-[36px]",
                default: "h-10 px-4 py-2 min-h-[44px] sm:min-h-[40px]",
                lg: "h-11 px-6 py-3 min-h-[48px] sm:min-h-[44px] sm:px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
