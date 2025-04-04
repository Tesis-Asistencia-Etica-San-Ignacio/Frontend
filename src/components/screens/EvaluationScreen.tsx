import EvaluationResultTemplate from "../templates/EvaluationResultTemplate"
import { CheckCircle, Circle } from "lucide-react"
import { ColumnConfig } from "@/types/table"
import { FormField } from "@/types/formTypes";


const modalFormFields: FormField[][] = [
    
    [
        {
            type: "email",
            key: "email",
            placeholder: "Tu correo institucional",
            required: true,
        },
        {
            type: "select",
            key: "country",
            placeholder: "País",
            required: true,
            options: [
                { value: "mx", label: "México" },
                { value: "us", label: "Estados Unidos" },
            ],
            selectPlaceholder: "Selecciona un país",
        },
    ],
    [
        {
            type: "password",
            key: "password",
            placeholder: "Contraseña",
            required: true,
            minLength: 6,
            maxLength: 50,
        },
        {
            type: "textarea",
            key: "bio",
            placeholder: "Biografía (auto ajustable)",
            required: false,
            autoAdjust: false,
            width: 50,
        },

    ],
];


const columnsConfig: ColumnConfig[] = [
    // Columna para la selección de filas (checkbox).
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
        searchable: true,
    },

    {
        id: "result",
        accessorKey: "result",
        headerLabel: "Resultado",
        renderType: "badgeWithText",
        badgeVariant: "approved",
        // Definicion un array de items con value, label e icon (opcional).
        items: [
            {
                value: "approved",
                label: "Aprobado",
                // Importar el ícono
                icon: CheckCircle,
                badgeVariant: "approved",
            },
            {
                value: "notapproved",
                label: "No aprobado",
                icon: Circle,
                badgeVariant: "notapproved",
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
        "id": "TASK-111 TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111TASK-111",
        "ethicsLaw": "Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2 Ley 2",
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
    const handleModalFormSubmit = async (data: any) => {
        console.log("Registro:", data);
    };

    return (
        <div>
            {/* Tabla dinámica (arriba) */}
            <EvaluationResultTemplate
                data={tableData}
                columnsConfig={columnsConfig}
                modalFormFields={modalFormFields}
                onModalSubmit={handleModalFormSubmit}
            />
        </div>
    )
}
