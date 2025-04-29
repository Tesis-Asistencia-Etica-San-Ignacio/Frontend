import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EvaluationResultTemplate from "../templates/EvaluationTemplate";
import { CheckCircle, Circle } from "lucide-react";
import type { ColumnConfig } from "@/types/table";
import type { FormField } from "@/types/formTypes";
import PdfRenderer from "../organisms/PdfRenderer";
import { useSendEmail } from "@/hooks/mails/useSendEmailHook";
import useGetEthicalRulesByEvaluationIdHook from "@/hooks/ethicalRules/useGetEthicalRulesByEvaluationIdHook";
import useGeneratePdfByEvaluationId from "@/hooks/pdf/useGeneratePdfByEvaluationId";

export default function EvaluationScreen() {
  const { evaluationId = "" } = useParams<{ evaluationId: string }>();
  const { norms, fetchNorms, loading } = useGetEthicalRulesByEvaluationIdHook(
    evaluationId ?? ""
  );
  const { mutateAsync: sendEmailMutation } = useSendEmail();
  const [modalOpen, setModalOpen] = useState(false);

  const { pdfUrl, fetchPdf, loading: loadingPdf } =
    useGeneratePdfByEvaluationId();

  useEffect(() => {
    fetchNorms();
  }, [fetchNorms]);

  useEffect(() => {
    if (modalOpen) {
      fetchPdf(evaluationId);
    }
  }, [modalOpen, evaluationId, fetchPdf]);

  const handleModalFormSubmit = async (data: any) => {
    await sendEmailMutation({
      to: data.to,
      subject: data.subject,
      mensajeAdicional: data.mensajeAdicional,
      evaluationId,
    });
  };

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
        component: <PdfRenderer url={pdfUrl} externalLoading={loadingPdf} />,
        required: false,
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
        {
          value: "APROBADO",
          label: "Aprobado",
          icon: CheckCircle,
          badgeVariant: "approved",
        },
        {
          value: "NO_APROBADO",
          label: "No aprobado",
          icon: Circle,
          badgeVariant: "notapproved",
        },
      ],
    },
    {
      id: "description",
      accessorKey: "description",
      headerLabel: "Descripción",
    }
  ];

  const transformData = (norms: any[]): any[] =>
    norms.map(({ codeNumber, status, description }) => ({
      codeNumber,
      status,
      description,
    }));

  const modalSuccessToast = {
    title: "Correo enviado correctamente",
    description: "El formulario se envió y el correo fue procesado con éxito.",
    icon: "✅",
    closeButton: true,
  };

  const modalErrorToast = {
    title: "Error al enviar el correo",
    description: "Ocurrió un problema al procesar el envío.",
    icon: "🚫",
    closeButton: true,
  };

  return (
    <div>
      {loading && <p>Cargando normas...</p>}
      <EvaluationResultTemplate
        data={transformData(norms)}
        columnsConfig={columnsConfig}
        
        modalFormFields={modalFormFields}
        onModalSubmit={handleModalFormSubmit}
        modalSuccessToast={modalSuccessToast}
        modalErrorToast={modalErrorToast}
        modalOpen={modalOpen}
        onModalOpenChange={setModalOpen}
      />
    </div>
  );
}
