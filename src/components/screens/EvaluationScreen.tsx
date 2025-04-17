import { useEffect } from "react"
import { useParams } from "react-router-dom"
import EvaluationResultTemplate from "../templates/EvaluationResultTemplate"
import { CheckCircle, Circle } from "lucide-react"
import { ColumnConfig } from "@/types/table"
import { FormField } from "@/types/formTypes"
import PdfRenderer from "../organisms/PdfRenderer"
import tallerPdf from "@/assets/taller_emergentes.pdf"
import { useSendEmail } from "@/hooks/mails/useSendEmailHook"
import useGetEthicalRulesByEvaluationIdHook from "@/hooks/ethicalRules/useGetEthicalRulesByEvaluationIdHook"

const modalFormFields: FormField[][] = [
    [
        { type: "email", key: "to", placeholder: "Correo de destino", required: true },
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
        },
        { type: "textarea", key: "mensajeAdicional", placeholder: "Mensaje adicional", required: false, autoAdjust: true },
    ],
]

const columnsConfig: ColumnConfig[] = [
    {
        id: "codeNumber",
        accessorKey: "codeNumber",
        headerLabel: "Número de norma",
    },
    {
        id: "status",
        accessorKey: "status",
        headerLabel: "Estado",
        renderType: "badgeWithText",
        items: [
            { value: "APROBADO", label: "Aprobado", icon: CheckCircle, badgeVariant: "approved" },
            { value: "NO_APROBADO", label: "No aprobado", icon: Circle, badgeVariant: "notapproved" },
        ],
    },
    {
        id: "description",
        accessorKey: "description",
        headerLabel: "Descripción",
    },
]

// Mantener solo los tres campos que queremos
const transformData = (norms: any[]): any[] =>
    norms.map(({ codeNumber, status, description }) => ({
        codeNumber,
        status,
        description,
    }))

export default function EvaluationScreen() {
    const { evaluationId } = useParams()
    const { norms, fetchNorms, loading } =
        useGetEthicalRulesByEvaluationIdHook(evaluationId || "")
    const { mutateAsync: sendEmailMutation } = useSendEmail()

    useEffect(() => {
        fetchNorms()
    }, [fetchNorms])

    useEffect(() => {
        console.log("Evaluación ID:", evaluationId)
        console.log("Normas éticas:", norms)
    }, [evaluationId, norms])

    const handleModalFormSubmit = async (data: any) => {
        try {
            await sendEmailMutation({
                to: data.to,
                subject: data.subject,
                mensajeAdicional: data.mensajeAdicional,
            })
            console.log("Correo enviado exitosamente.")
        } catch (err) {
            console.error("Error al enviar el correo:", err)
        }
    }

    return (
        <div>
            {loading && <p>Cargando normas...</p>}
            <EvaluationResultTemplate
                data={transformData(norms)}
                columnsConfig={columnsConfig}
                modalFormFields={modalFormFields}
                onModalSubmit={handleModalFormSubmit}
            />
        </div>
    )
}
