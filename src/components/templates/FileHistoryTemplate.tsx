import React from "react"
import { ColumnConfig } from "@/types/table"
import { DynamicDataTable } from "../organisms/DynamicDataTable"
import ConfirmDialog from "@/components/organisms/dialogs/ConfirmDialog"
import { TriangleAlert } from "lucide-react"
import { Label } from "@/components/atoms/ui/label";
import { Input } from "@/components/atoms/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/atoms/ui/alert"

interface FileHistoryTemplateProps {
  data: any[]
  columnsConfig: ColumnConfig[]
  deleteDialogOpen: boolean
  onDeleteDialogChange: (open: boolean) => void
  onConfirmDelete: () => Promise<void>
  confirmValue: string
  onConfirmValueChange: (value: string) => void
}


export default function FileHistoryTemplate({
  data,
  columnsConfig,
  deleteDialogOpen,
  onDeleteDialogChange,
  onConfirmDelete,
  confirmValue,
  onConfirmValueChange,
}: FileHistoryTemplateProps) {

  return (
    <section>
      <div className="mb-4 flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight">Historial de Archivos</h2>
        <p className="text-muted-foreground">
          Aquí está una lista de todos los archivos evaluados previamente
        </p>
      </div>

      <DynamicDataTable data={data} columnsConfig={columnsConfig} />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogChange}
        handleConfirm={async () => {
          await onConfirmDelete()
          onDeleteDialogChange(false)
        }}
        disabled={confirmValue.trim() !== "ELIMINAR"}
        destructive
        title={
          <span className="text-destructive flex items-center space-x-1">
            <TriangleAlert size={18} className="inline-block mr-1" />
            Eliminar Evaluación
          </span>
        }
        description={
          <div className="space-y-4">
            <p>
              Para confirmar, escribe <code>ELIMINAR</code>:
            </p>
            <Label>
              <Input
                value={confirmValue}
                onChange={(e) => onConfirmValueChange(e.target.value)}
                placeholder=" ELIMINAR"
              />
            </Label>
            <Alert variant="destructive">
              <AlertTitle>¡Atención!</AlertTitle>
              <AlertDescription>Esta acción no se puede deshacer.</AlertDescription>
            </Alert>
          </div>
        }
        confirmText="ELIMINAR"
      />
    </section>
  )
}
