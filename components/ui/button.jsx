import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = ({ variant = "primary", size = "md", className = "" }) => {
    const baseClasses =
        "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95";

    const variants = {
        primary:
            "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700",
        secondary:
            "bg-white/20 backdrop-blur-sm text-gray-800 border border-white/30 shadow-lg hover:bg-white/30",
        ghost: "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return cn(baseClasses, variants[variant], sizes[size], className);
};

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button, buttonVariants };
