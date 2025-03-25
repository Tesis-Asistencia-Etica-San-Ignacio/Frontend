import { Button } from "../atoms/ui/button";

interface EthicalEvaluationBoxProps {
    selectedTask?: { ethicsLaw?: string } | null
}

export default function EthicalEvaluationBox({ selectedTask }: EthicalEvaluationBoxProps) {
    return (
        <div className="space-y-3 flex flex-col flex-1 min-h-0">
            <div className="space-y-4 flex flex-col flex-1 min-h-0">
                <div className="border p-4 rounded-md flex-1 flex flex-col min-h-0">
                    <h2 className="font-semibold mb-2">Extracto documento</h2>

                    {selectedTask?.ethicsLaw ? (
                        <p>{selectedTask.ethicsLaw}</p>
                    ) : (
                        <p className="text-muted-foreground">
                            Selecciona una fila para ver el extracto.
                        </p>
                    )}
                </div>
            </div>
            <div className="flex justify-end space-x-2">
                <Button variant="outline">Descargar resultado</Button>
                <Button>Enviar resultado</Button>
            </div>
        </div>
    )
}