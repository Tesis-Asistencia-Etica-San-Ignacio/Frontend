import { Edit } from "lucide-react"      // Ejemplo de ícono
import { Button } from "../atoms/ui/button" 

interface EvaluationHeaderProps {
  readonly title?: string
  readonly onEdit?: () => void
}

export function EvaluationHeader({
  title = "Resultado de la evaluación:",
  onEdit,
}: EvaluationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Título a la izquierda */}
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

      {/* Botón con ícono a la derecha */}
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Edit />
      </Button>
    </div>
  )
}