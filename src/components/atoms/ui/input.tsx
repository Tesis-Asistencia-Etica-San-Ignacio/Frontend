"use client"

import * as React from "react"
import { Button } from "@/components/atoms/ui/button"
import { cn } from "@/lib/utils"
import { z } from "zod"
import {
  Mail,
  Lock,
  Phone,
  User,
  MapPin,
  Search as SearchIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react"

type InputType =
  | "email"
  | "document"
  | "password"
  | "phone"
  | "user"
  | "address"
  | "extension-phone"
  | "search"
  | undefined

function getConfigForType(type: InputType) {
  switch (type) {
    case "email":
      return {
        schema: z.string().email("El email no es válido").max(50),
        maxLength: 50,
        icon: <Mail className="w-5 h-5 text-gray-400" />,
      }
    case "password":
      return {
        schema: z.string().min(6).max(50),
        maxLength: 50,
        icon: <Lock className="w-5 h-5 text-gray-400" />,
      }
    case "phone":
      return {
        schema: z.string().regex(/^\d+$/, "Solo dígitos").max(10),
        maxLength: 10,
        icon: <Phone className="w-5 h-5 text-gray-400" />,
      }
    case "extension-phone":
      return {
        schema: z.string().regex(/^\d+$/, "Solo dígitos").max(2),
        maxLength: 2,
        icon: <Phone className="w-5 h-5 text-gray-400" />,
      }
    case "document":
      return {
        schema: z.string().regex(/^\d+$/, "Solo dígitos").max(10),
        maxLength: 10,
        icon: <User className="w-5 h-5 text-gray-400" />,
      }
    case "user":
      return {
        schema: z.string().min(4).max(40),
        maxLength: 40,
        icon: <User className="w-5 h-5 text-gray-400" />,
      }
    case "address":
      return {
        schema: z.string().max(100),
        maxLength: 100,
        icon: <MapPin className="w-5 h-5 text-gray-400" />,
      }
    case "search":
      return {
        schema: z.string().max(100),
        maxLength: 100,
        icon: <SearchIcon className="w-5 h-5 text-gray-400" />,
      }
    default:
      return {
        schema: z.string().max(100),
        maxLength: 100,
        icon: undefined,
      }
  }
}

const containerClass = `
  relative flex items-center h-12
  rounded-full bg-primary-grey-50
  px-4 py-2 text-base border border-primary-grey-300
  focus-visible:outline-none
`

const inputStyle = `
  flex-1 bg-transparent outline-none
  placeholder:text-gray-400
`

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  inputType?: InputType
  icon?: React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputType, icon, value = "", onChange, maxLength, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const { schema, maxLength: defaultMaxLength, icon: defaultIcon } =
      getConfigForType(inputType)

    let nativeType: React.HTMLInputTypeAttribute = "text"
    if (inputType === "password") {
      nativeType = showPassword ? "text" : "password"
    } else if (inputType === "email") {
      nativeType = "email"
    } else if (inputType === "search") {
      nativeType = "search"
    } else if (
      inputType === "phone" ||
      inputType === "extension-phone" ||
      inputType === "document"
    ) {
      nativeType = "tel"
    }

    const finalIcon = icon ?? defaultIcon
    const finalMaxLength = maxLength ?? defaultMaxLength

    return (
      <div className={cn(containerClass, className)}>
        {finalIcon && (
          <div className="absolute left-4 flex items-center justify-center w-5 h-5">
            {finalIcon}
          </div>
        )}
        <input
          ref={ref}
          type={nativeType}
          maxLength={finalMaxLength}
          value={value}
          onChange={onChange}
          className={cn(inputStyle, finalIcon ? "pl-8" : "pl-2")}
          {...props}
        />
        {inputType === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </Button>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
