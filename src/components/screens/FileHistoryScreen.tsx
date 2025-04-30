import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileHistoryTemplate from "../templates/FileHistoryTemplate";
import { CheckCircle, Circle } from "lucide-react";
import { ColumnConfig } from "@/types/table";
import useGetEvaluationsByUserHook from "@/hooks/evaluation/useGetEvaluationByUser";
import useGenerateEvaluationHook from "@/hooks/ia/useGenerateAnalisisHook";
import useDeleteEvaluationHook from "@/hooks/evaluation/useDeleteEvaluationHook";
import { FormField } from "@/types/formTypes";

function createColumnsConfig({
  onEdit,
  onVerMas,
  onDelete,
}: {
  onEdit: (rowData: any) => void;
  onVerMas: (rowData: any) => void;
  onDelete: (rowData: any) => void;
}): ColumnConfig[] {
  return [
    {
      id: "id",
      accessorKey: "id",
      headerLabel: "ID",
      searchable: true,
    },
    {
      id: "correo_estudiante",
      accessorKey: "correo_estudiante",
      headerLabel: "Correo Estudiante",
      searchable: true,
    },
    {
      id: "file",
      accessorKey: "file",
      headerLabel: "Archivo",
    },
    {
      id: "tipo_error",
      accessorKey: "tipo_error",
      headerLabel: "Tipo de error",
    },
    {
      id: "aprobado",
      accessorKey: "aprobado",
      headerLabel: "Aprobado",
      renderType: "badgeWithText",
      badgeKey: "label",
      textKey: "text",
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
    {
      id: "estado",
      accessorKey: "estado",
      headerLabel: "Estado",
      items: [
        {
          value: "PENDIENTE",
          label: "Pendiente",
        },
        {
          value: "EN CURSO",
          label: "En curso",
        },
        {
          value: "EVALUADO",
          label: "Evaluado",
        },
      ],
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      headerLabel: "Creado",
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      headerLabel: "Actualizado",
    },
    {
      id: "actions",
      type: "actions",
      actionItems: [
        {
          label: "Editar",
          onClick: onEdit,
        },
        {
          label: "Ver más",
          onClick: onVerMas,
        },
        {
          label: "Reevaluar",
          visible: (rowData) => rowData.estado === "EVALUADO",
        },
        {
          label: "Eliminar",
          onClick: onDelete,
        },
      ],
    },
  ];
}

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
      type: "textarea",
      key: "mensajeAdicional",
      placeholder: "Mensaje adicional",
      required: false,
      autoAdjust: true,
    },
  ],
];

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toISOString().split("T")[0];

const transformFile = (url: string): string => {
  const key = "uploads/";
  const idx = url.indexOf(key);
  return idx >= 0 ? url.slice(idx + key.length) : url;
};

const transformData = (data: any[]) =>
  data.map((row) => ({
    id: row.id,
    correo_estudiante: row.correo_estudiante,
    file: transformFile(row.file),
    tipo_error: row.tipo_error,
    aprobado: row.aprobado ? "approved" : "notapproved",
    estado: row.estado?.toUpperCase() || "",
    createdAt: formatDate(row.createdAt),
    updatedAt: formatDate(row.updatedAt),
  }));

export default function FileHistoryScreen() {
  const { files, getFilesByUser } = useGetEvaluationsByUserHook();
  const { generate } = useGenerateEvaluationHook();
  const { deleteEvaluation } = useDeleteEvaluationHook();
  const [tableData, setTableData] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [toDeleteId, setToDeleteId] = useState<string>("");
  const navigate = useNavigate();



  const handleEdit = (row: any) => {
    setModalOpen(true);
  };
  const handleVerMas = (rowData: any) => {
    if (rowData.estado === "PENDIENTE") {
      generate(rowData.id);
    }
    navigate(`/evaluacion/${rowData.id}`)
  }

  const handleDelete = (row: any) => {
    setToDeleteId(row.id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = async () => {
    await deleteEvaluation(toDeleteId);
    setDeleteDialogOpen(false);
    setConfirmValue("");
    getFilesByUser();
  };

  const columnsConfig = createColumnsConfig({
    onEdit: handleEdit,
    onVerMas: handleVerMas,
    onDelete: handleDelete,
  });

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

  const handleModalFormSubmit = async (data: any) => {
    try {
      setModalOpen(false);
      getFilesByUser();
    } catch {
    }
  };
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getFilesByUser();
    modalOpen
  }, [getFilesByUser]);

  useEffect(() => {
    if (Array.isArray(files)) {
      setTableData(transformData(files));
    }
  }, [files]);


  return (
    <FileHistoryTemplate
      data={tableData}
      columnsConfig={columnsConfig}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogChange={setDeleteDialogOpen}
      onConfirmDelete={handleConfirmDelete}
      confirmValue={confirmValue}
      onConfirmValueChange={setConfirmValue}

      open={modalOpen}
      onOpenChange={(open) => {
        setModalOpen(open);
      }}
      modalFormFields={modalFormFields}
      onModalSubmit={handleModalFormSubmit}
      modalSuccessToast={modalSuccessToast}
      modalErrorToast={modalErrorToast}
    />
  );
}
