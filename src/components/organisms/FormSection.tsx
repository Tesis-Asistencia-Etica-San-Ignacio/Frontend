import React from "react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/atoms/ui/collapsible"
import { DynamicForm, DynamicFormHandles } from "../molecules/Dynamic-form"
import type { FormField } from "@/types/formTypes"
import { LTMatch } from "@/lib/api/languageApi"

export interface FormSectionProps {
  sectionKey: string
  title: string
  dynamicFormKey?: string
  open: boolean
  onToggle: () => void
  formRef: React.RefObject<DynamicFormHandles>
  fields: FormField[]
  initialData: Record<string, string>
  onChange: (vals: Record<string, string>) => void
  //onSpellCheck?: (fieldKey: string, matches: LTMatch[]) => void
  onSpellCheck?: (key: string, text: string) => void
  spellWarnings?: Record<string, LTMatch[]>
}

export const FormSection: React.FC<FormSectionProps> = ({
  sectionKey,
  title,
  open,
  onToggle,
  formRef,
  fields,
  initialData,
  dynamicFormKey,
  onChange,
  onSpellCheck,
  spellWarnings,
}) => {
  return (
    <Collapsible open={open} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="w-full bg-white text-[#111827] p-4 rounded-md shadow border border-gray-300 text-left font-semibold"
        >
          {title}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 border border-gray-300 rounded-md flex flex-col gap-4">
        <DynamicForm
          key={dynamicFormKey ?? sectionKey}
          ref={formRef}
          formDataConfig={fields}
          initialData={initialData}
          onChange={onChange}
          onSpellCheck={onSpellCheck}
          spellWarnings={spellWarnings}
          containerClassName="flex flex-col gap-6"
        />
      </CollapsibleContent>
    </Collapsible>
  )
}
