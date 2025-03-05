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

/**
 * Tipos posibles de input
 */
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

/**
 * Función que retorna un objeto unificado con:
 * - schema (Zod)
 * - maxLength (número)
 * - icon (ReactNode)
 * según el tipo de input
 */
function getConfigForType(type: InputType) {
  switch (type) {
    case "email":
      return {
        schema: z
          .string()
          .email("El email no es válido")
          .max(50, "Máx 50 caracteres"),
        maxLength: 50,
        icon: <Mail className="w-5 h-5 text-gray-400" />,
      }
    case "password":
      return {
        schema: z
          .string()
          .min(6, "Mínimo 6 caracteres")
          .max(50, "Máx 50 caracteres"),
        maxLength: 50,
        icon: <Lock className="w-5 h-5 text-gray-400" />,
      }
    case "phone":
      return {
        schema: z
          .string()
          .regex(/^\d+$/, "Solo dígitos")
          .max(10, "Máx 10 dígitos"),
        maxLength: 10,
        icon: <Phone className="w-5 h-5 text-gray-400" />,
      }
    case "extension-phone":
      return {
        schema: z
          .string()
          .regex(/^\d+$/, "Solo dígitos")
          .max(2, "Máx 2 dígitos"),
        maxLength: 2,
        icon: <Phone className="w-5 h-5 text-gray-400" />,
      }
    case "document":
      return {
        schema: z
          .string()
          .regex(/^\d+$/, "Solo dígitos")
          .max(10, "Máx 10 dígitos"),
        maxLength: 10,
        icon: <User className="w-5 h-5 text-gray-400" />,
      }
    case "user":
      return {
        schema: z
          .string()
          .min(4, "Mínimo 4 caracteres")
          .max(40, "Máx 40 caracteres"),
        maxLength: 40,
        icon: <User className="w-5 h-5 text-gray-400" />,
      }
    case "address":
      return {
        schema: z.string().max(100, "Máx 100 caracteres"),
        maxLength: 100,
        icon: <MapPin className="w-5 h-5 text-gray-400" />,
      }
    case "search":
      return {
        schema: z.string().max(100, "Máx 100 caracteres"),
        maxLength: 100,
        icon: <SearchIcon className="w-5 h-5 text-gray-400" />,
      }
    default:
      return {
        schema: z.string().max(100, "Máx 100 caracteres"),
        maxLength: 100,
        icon: undefined,
      }
  }
}

/**
 * Estilos base para el contenedor del input
 */
const containerClass = `
  relative flex items-center h-12
  rounded-full bg-primary-grey-50
  px-4 py-2 text-base border border-primary-grey-300
  focus-visible:outline-none
`

/**
 * Estilo interno del <input />
 */
const inputStyle = `
  flex-1 bg-transparent outline-none
  placeholder:text-gray-400
`

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  inputType?: InputType
  icon?: React.ReactNode
  value?: string
  onValueChange?: (value: string, error?: string) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputType, icon, value = "", onValueChange, maxLength, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    // Obtenemos la config unificada
    const { schema, maxLength: defaultMaxLength, icon: defaultIcon } = getConfigForType(inputType)

    // Determinar el <input type> nativo
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

    // Ícono final (se sobrescribe si pasas uno manual)
    const finalIcon = icon ?? defaultIcon

    // maxLength final
    const finalMaxLength = maxLength ?? defaultMaxLength

    // Validación Zod
    const validateValue = (val: string) => {
      try {
        schema.parse(val)
        onValueChange?.(val, undefined)
      } catch (err: any) {
        const errMsg = err.errors?.[0]?.message || "Valor inválido"
        onValueChange?.(val, errMsg)
      }
    }

    // Manejador de cambios
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      validateValue(val)
    }

    return (
      <div className={cn(containerClass, className)}>
        {/* Ícono a la izquierda */}
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
          onChange={handleChange}
          className={cn(
            inputStyle,
            finalIcon ? "pl-8" : "pl-2" 
          )}
          {...props}
        />
        {/* Toggle de contraseña */}
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
