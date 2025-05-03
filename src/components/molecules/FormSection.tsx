import { Label } from "@/components/atoms/ui/label"
import { Input } from "@/components/atoms/ui/input"
import { Textarea } from "@/components/atoms/ui/textarea"

type FormSectionProps = {
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
  value: string;
  onChange: (value: string) => void;
};

export const FormSection = ({ label, placeholder, type = "input", value, onChange }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-md font-semibold">{label}</Label>
      {type === "textarea" ? (
        <Textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
};
