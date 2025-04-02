// /src/types/formTypes.ts
import { JSX } from "react"

/**
 * Tipos de campo que maneja tu formulario dinámico.
 * "textarea" se diferencia de los que se usan en el Input personalizado.
 */
export type FieldType =
    | "email"
    | "select"
    | "custom"
    | "password"
    | "extension-phone"
    | "phone"
    | "document"
    | "address"
    | "user"
    | "textarea"

/**
 * Estructura base para cualquier campo.
 */
export interface BaseFormField {
    /** Tipo de campo (email, password, textarea, etc.) */
    type: FieldType
    /** Identificador único del campo (para React Hook Form y Zod). */
    key: string
    /** Placeholder o etiqueta del campo */
    placeholder?: string
    /** Si es requerido. */
    required?: boolean
    /** Mínimo de caracteres (ej: 6 para password). */
    minLength?: number
    /** Máximo de caracteres permitidos. */
    maxLength?: number
    /**
     * Validación custom: si retorna un string => se asume mensaje de error.
     * Si retorna undefined => no hay error.
     */
    customValidation?: (value: any) => string | undefined
    /**
     * width en porcentaje. Ej: 33 => 33% del contenedor
     */
    width?: number
}

/**
 * Campo tipo "select" que recibe un array de opciones.
 */
export interface SelectFormField extends BaseFormField {
    type: "select"
    options: { value: string; label: string }[]
    /** Placeholder que se verá en <SelectValue>. */
    selectPlaceholder?: string
}

/**
 * Campo tipo "custom" para insertar un componente JSX arbitrario.
 */
export interface CustomFormField extends BaseFormField {
    type: "custom"
    /** El componente React que se renderizará. */
    component: JSX.Element
}

/**
 * Campo tipo "textarea".
 * `autoAdjust` => autoajustar altura del textarea según contenido.
 */
export interface TextAreaFormField extends BaseFormField {
    type: "textarea"
    autoAdjust?: boolean
}

/**
 * Tipo unificado para el arreglo de campos.
 * Puede ser base, select, custom o textarea.
 */
export type FormField =
    | BaseFormField
    | SelectFormField
    | CustomFormField
    | TextAreaFormField
