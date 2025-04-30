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
import useUpdateEthicalNormHook from "@/hooks/ethicalRules/useUpdateEthicalRulesHook";

export default function EvaluationScreen() {
  const { evaluationId = "" } = useParams<{ evaluationId: string }>();
  const { norms, fetchNorms, loading } =
    useGetEthicalRulesByEvaluationIdHook(evaluationId);
  const { mutateAsync: sendEmailMutation } = useSendEmail();
  const { updateEthicalNorm, loading: updating } = useUpdateEthicalNormHook();
  const {
    pdfUrl,
    fetchPdf,
    loading: loadingPdf,
  } = useGeneratePdfByEvaluationId();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNorm, setSelectedNorm] = useState<any>(null);

  useEffect(() => {
    fetchNorms();
  }, [fetchNorms]);

  useEffect(() => {
    if (modalOpen) {
      fetchPdf(evaluationId);
    }
  }, [modalOpen, evaluationId, fetchPdf]);

  // 1) Datos para la tabla sin el campo _id
  const tableData = norms.map(({  evaluationId, createdAt, updatedAt, ...rest }) => rest);

  // 2) Envío de correo
  const handleModalFormSubmit = async (data: any) => {
    await sendEmailMutation({
      to: data.to,
      subject: data.subject,
      mensajeAdicional: data.mensajeAdicional,
      evaluationId,
    });
    setModalOpen(false);
  };

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

  // 3) Abrir modal de edición y recuperar objeto completo
  const onEdit = (rowData: any) => {
    const fullNorm = norms.find((n) => n.codeNumber === rowData.codeNumber);
    if (!fullNorm) return;
    setSelectedNorm(fullNorm);
    setIsEditModalOpen(true);
  };

  const editModalFields: FormField[][] = [
    [
      {
        type: "select",
        key: "estado",
        placeholder: "Estado",
        required: true,
        selectPlaceholder: "Selecciona estado",
        options: [
          { value: "APROBADO", label: "Aprobado" },
          { value: "NO_APROBADO", label: "No aprobado" },
        ],
      },
    ],
    [
      {
        type: "textarea",
        key: "cita",
        placeholder: "Cita",
        required: true,
      } 
    ],
    [
      {
        type: "textarea",
        key: "justificacion",
        placeholder: "Justificación",
        required: true,
        autoAdjust: true,
      },
    ],
  ];

  const handleEditSubmit = async (data: any) => {
    await updateEthicalNorm(selectedNorm.id, {
      cita: data.cita,
      status: data.estado,
      justification: data.justificacion,
    });
    setIsEditModalOpen(false);
  };

  const editSuccess = {
    title: "Norma actualizada",
    description: "Cambios guardados.",
    icon: "✅",
    closeButton: true,
  };
  const editError = {
    title: "Error al actualizar",
    description: "No se pudo guardar.",
    icon: "🚫",
    closeButton: true,
  };

  // 4) Columnas sin la columna ID
  const columnsConfig: ColumnConfig[] = [
    {
      id: "id",
      accessorKey: "id",
      headerLabel: "ID",
    },
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
    },
    {
      id: "actions",
      type: "actions",
      actionItems: [{ label: "Editar", onClick: onEdit }],
    },
  ];

  return (
    <div>
      {loading && <p>Cargando normas…</p>}
      <EvaluationResultTemplate
        data={tableData}
        columnsConfig={columnsConfig}
        // Modal correo
        modalFormFields={modalFormFields}
        onModalSubmit={handleModalFormSubmit}
        modalSuccessToast={modalSuccessToast}
        modalErrorToast={modalErrorToast}
        modalOpen={modalOpen}
        onModalOpenChange={setModalOpen}
        // Modal edición
        editModalFormFields={editModalFields}
        onEditModalSubmit={handleEditSubmit}
        editModalOpen={isEditModalOpen}
        onEditModalOpenChange={setIsEditModalOpen}
        editModalSuccessToast={editSuccess}
        editModalErrorToast={editError}
      />
    </div>
  );
}
