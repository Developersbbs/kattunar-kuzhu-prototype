"use client"

import * as React from "react"
import { OTPInput } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(({
  className,
  containerClassName,
  ...props
}, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({
  char,
  hasFakeCaret,
  isActive,
  className,
  placeholderChar,  // Explicitly extract placeholderChar
  ...props
}, ref) => {
  // Remove placeholderChar from props to avoid DOM warning
  const displayChar = char || (placeholderChar && 
    <span className="text-muted-foreground">{placeholderChar}</span>
  )

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-10 w-10 rounded-md text-center text-base font-medium ring-offset-background",
        "border border-input bg-transparent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "animate-in fade-in-0 zoom-in-50",
        "flex items-center justify-center",
        isActive && "border-primary ring-2 ring-primary ring-offset-2",
        className
      )}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-primary duration-500" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <MinusIcon className="h-4 w-4 text-muted-foreground" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
