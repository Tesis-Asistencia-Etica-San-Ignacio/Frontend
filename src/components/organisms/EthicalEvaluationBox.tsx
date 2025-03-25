import { Button } from "../atoms/ui/button";

export default function EthicalEvaluationBox() {
    return (
        <div>
            <div className="space-y-4 p-8">
            <div className="border p-4 rounded-md">
            <h2 className="font-semibold mb-2">Extracto documento</h2>
            
            <p className="text-muted-foreground">
            Selecciona una fila para ver el extracto.
            </p>
            
            </div>
        </div>
        <div className="flex justify-end space-x-2">
            <Button variant="outline">Descargar resultado</Button>
            <Button>Enviar resultado</Button>
        </div>
        </div>
    )
}