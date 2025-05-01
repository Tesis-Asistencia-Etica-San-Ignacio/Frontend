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
  const { pdfUrl, fetchPdf, loading: loadingPdf, } = useGeneratePdfByEvaluationId();

  const [tableData, setTableData] = useState<any[]>([]);

  const [selectedRow, setSelectedRow] = useState<any>(null);
  /* modales */
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {
    fetchNorms();
  }, [fetchNorms]);

  useEffect(() => {
    if (mailModalOpen) {
      fetchPdf(evaluationId);
    }
  }, [mailModalOpen, evaluationId, fetchPdf]);

  useEffect(() => {
    console.log("norm", norms);
    setTableData(
      norms.map(({ evaluationId, createdAt, updatedAt, ...rest }) => rest)
    );
  }, [norms]);

  const handleMailModalFormSubmit = async (data: any) => {
    await sendEmailMutation({
      to: data.to,
      subject: data.subject,
      mensajeAdicional: data.mensajeAdicional,
      evaluationId,
    });
    setMailModalOpen(false);
  };

  const handleEditSubmit = async (data: any) => {
    if (!selectedRow) return;
    const params = {
      status: data.estado,
      cita: data.cita,
      justification: data.justificacion,
    };
    await updateEthicalNorm(selectedRow.id, params);
    setTableData((prev) =>
      prev.map((r) =>
        r.id === selectedRow.id
          ? {
            ...r,
            ...params,
            status: params.status,
            // si quieres reflejar un updatedAt local:
            updatedAt: new Date().toISOString(),
          }
          : r
      )
    );
    setEditModalOpen(false);
  };

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
  };
  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };


  const editInitialData = selectedRow
    ? {
      estado: selectedRow.status,
      cita: selectedRow.cita,
      justificacion: selectedRow.justification,
    }
    : {};

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

  const editModalFields: FormField[][] = [
    [
      {
        type: "select",
        key: "estado",
        placeholder: "Estado",
        required: false,
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
        required: false,
      }
    ],
    [
      {
        type: "textarea",
        key: "justificacion",
        placeholder: "Justificación",
        required: false,
        autoAdjust: true,
      },
    ],
  ];

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
      actionItems: [{ label: "Editar", onClick: handleEdit }],
    },
  ];

  return (
    <div>
      {loading && <p>Cargando normas…</p>}
      <EvaluationResultTemplate
        data={tableData}
        columnsConfig={columnsConfig}
        // Tabla
        onRowClick={handleRowClick}
        DataSelectedRow={selectedRow}
        // Modal correo
        modalFormFields={modalFormFields}
        onModalSubmit={handleMailModalFormSubmit}
        modalOpen={mailModalOpen}
        onMailModalOpenChange={setMailModalOpen}
        // Modal edición
        editModalFormFields={editModalFields}
        onEditModalSubmit={handleEditSubmit}
        editModalOpen={editModalOpen}
        onEditModalOpenChange={setEditModalOpen}

        editInitialData={editInitialData}
      />
    </div>
  );
}
