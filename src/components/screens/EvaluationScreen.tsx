import EvaluationResultTemplate from "../templates/EvaluationResultTemplate";
import { CheckCircle, Circle } from "lucide-react";
import { ColumnConfig } from "@/types/table";
import { FormField } from "@/types/formTypes";
import PdfRenderer from "../organisms/PdfRenderer";
import tallerPdf from "@/assets/taller_emergentes.pdf";

import { useSendEmail } from "@/hooks/mails/useSendEmailHook";

const modalFormFields: FormField[][] = [
    [
        {
            type: "email",
            key: "to",
            placeholder: "Correo de destino",
            required: true,
        },
        {
            type: "select",
            key: "subject",
            placeholder: "Motivo del correo",
            required: true,
            selectPlaceholder: "Selecciona un motivo",
            options: [
                { value: "Incompletitud", label: "Incompletitud" },
                { value: "Ortografía", label: "Ortografía" },
                { value: "Coherencia", label: "Coherencia" },
                { value: "Aprobación", label: "Aprobación" },
            ],
        },
    ],
    [
        {
            type: "custom",
            key: "pdfPreview",
            placeholder: "Vista previa PDF",
            component: <PdfRenderer url={tallerPdf} />,
            required: false,
            // width: 50, // si tu form lo maneja
        },
        {
            type: "textarea",
            key: "mensajeAdicional",
            placeholder: "Mensaje adicional",
            required: false,
            autoAdjust: true,
        },
    ],
];

const columnsConfig: ColumnConfig[] = [
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
        items: [
            {
                value: "approved",
                label: "Aprobado",
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
];

const tableData = [
    {
        id: "TASK-8782",
        ethicsLaw: "Ley 1",
        result: "approved",
    },
    {
        id: "TASK-111",
        ethicsLaw: "Ley 2 (Texto largo...)",
        result: "notapproved",
    },
    {
        id: "TASK-222",
        ethicsLaw: "Ley 3",
        result: "approved",
    },
    {
        id: "TASK-333",
        ethicsLaw: "Ley 4",
        result: "approved",
    },
    {
        id: "TASK-444",
        ethicsLaw: "Ley 5",
        result: "notapproved",
    },
];


export default function EvaluationScreen() {
    const { mutateAsync: sendEmailMutation } = useSendEmail();

    const handleModalFormSubmit = async (data: any) => {
        console.log("Registro:", data);
        try {
            await sendEmailMutation({
                to: data.to,
                subject: data.subject,
                mensajeAdicional: data.mensajeAdicional,
            });
            console.log("Correo enviado exitosamente.");
        } catch (err) {
            console.error("Error al enviar el correo:", err);
        }
    };

    return (
        <div>
            <EvaluationResultTemplate
                data={tableData}
                columnsConfig={columnsConfig}
                modalFormFields={modalFormFields}
                onModalSubmit={handleModalFormSubmit}
            />
        </div>
    );
}
