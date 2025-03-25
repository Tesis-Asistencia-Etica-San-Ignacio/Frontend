import EvaluationResultTemplate from "../templates/EvaluationResultTemplate"
import { CheckCircle, Circle } from "lucide-react"
import { ColumnConfig } from "@/types/table"



//Definimos columnas en JSON
const columnsConfig: ColumnConfig[] =[
    // Columna para la selección de filas (checkbox).
    {
        id: "select",
        type: "selection",
    },
    {
        id: "id",
        accessorKey: "id",
        headerLabel: "Task ID",
        searchable: true,
    },
    {
        id: "ethicsLaw",
        accessorKey: "ethicsLaw",
        headerLabel: "Ley Ética",
        renderType: "badgeWithText",
        badgeKey: "label",
        textKey: "text",
        searchable: true,
    },
    {
        id: "result",
        accessorKey: "result",
        headerLabel: "Resultado",
        // Definicion un array de items con value, label e icon (opcional).
        items: [
            {
                value: "approved",
                label: "Aprobado",
                // Importar el ícono
                icon: CheckCircle,
            },
            {
                value: "notapproved",
                label: "No aprobado",
                icon: Circle, // TODO: PONER UN INCONO DE X
            },
        ],
    },
]

const tableData = [
    {
        "id": "TASK-8782",
        "ethicsLaw": "Ley 1",
        "result": "approved",
    },
    {
        "id": "TASK-111",
        "ethicsLaw": "Ley 2",
        "result": "notapproved",
    },
    {
        "id": "TASK-222",
        "ethicsLaw": "Ley 3",
        "result": "approved",
    },
    {
        "id": "TASK-333",
        "ethicsLaw": "Ley 4",
        "result": "approved",
    },
    {
        "id": "TASK-444",
        "ethicsLaw": "Ley 5",
        "result": "notapproved",
    },
]

export default function EvaluationScreen() {
    return (
        <div>
            {/* Tabla dinámica (arriba) */}
            <EvaluationResultTemplate data={tableData} columnsConfig={columnsConfig} />
        </div>
    )
}
