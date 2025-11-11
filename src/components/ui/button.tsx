import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
  {
    variants: {
      variant: {
        default:
          "bg-clay-peach text-foreground clay-shadow hover:clay-shadow-hover hover:scale-[1.02] active:clay-shadow-active active:scale-[0.98]",
        secondary:
          "bg-clay-lavender text-foreground clay-shadow hover:clay-shadow-hover hover:scale-[1.02] active:clay-shadow-active active:scale-[0.98]",
        accent:
          "bg-clay-mint text-foreground clay-shadow hover:clay-shadow-hover hover:scale-[1.02] active:clay-shadow-active active:scale-[0.98]",
        sky:
          "bg-clay-sky text-foreground clay-shadow hover:clay-shadow-hover hover:scale-[1.02] active:clay-shadow-active active:scale-[0.98]",
        destructive:
          "bg-clay-coral text-foreground clay-shadow hover:clay-shadow-hover hover:scale-[1.02] active:clay-shadow-active active:scale-[0.98]",
        outline:
          "border-2 border-primary/30 bg-transparent text-foreground clay-shadow-sm hover:bg-clay-peach hover:border-primary/50 hover:clay-shadow hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground hover:bg-clay-peach/50 hover:clay-shadow-sm hover:scale-[1.02] active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "clay-rounded-md px-6 py-3 text-base has-[>svg]:px-4",
        sm: "clay-rounded-sm px-4 py-2 text-sm has-[>svg]:px-3",
        lg: "clay-rounded-md px-8 py-4 text-lg has-[>svg]:px-6",
        icon: "clay-rounded-md p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
