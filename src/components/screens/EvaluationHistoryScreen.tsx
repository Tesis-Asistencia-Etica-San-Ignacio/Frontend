import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EvaluationHistoryTemplate from "../templates/EvaluationHistoryTemplate";
import { CheckCircle, Circle } from "lucide-react";
import { ColumnConfig } from "@/types/table";
import useGetEvaluationsByUserHook from "@/hooks/evaluation/useGetEvaluationByUser";
import useGenerateEvaluationHook from "@/hooks/ia/useGenerateAnalisisHook";
import useDeleteEvaluationHook from "@/hooks/evaluation/useDeleteEvaluationHook";
import useUpdateEvaluationHook from "@/hooks/evaluation/useUpdateEvaluationHook";
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
      id: "id_fundanet",
      accessorKey: "id_fundanet",
      headerLabel: "ID FundaNet",
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

// Base config de campos de edición
const baseEditFields: FormField[][] = [
  [
    { type: "email", key: "correo_estudiante", placeholder: "Correo del estudiante" },
  ],
  [
    { type: "textarea", key: "tipo_error", placeholder: "Tipo de error", autoAdjust: true },
  ],
  [
    {
      type: "select",
      key: "aprobado",
      placeholder: "Resultado de la evaluación",
      selectPlaceholder: "Seleccione un resultado",
      options: [
        { value: "true", label: "Aprobado" },
        { value: "false", label: "Rechazado" },
      ],
    },
  ],
  [
    {
      type: "select",
      key: "estado",
      placeholder: "Estado del archivo",
      selectPlaceholder: "Seleccione un estado",
      options: [
        { value: "PENDIENTE", label: "Pendiente" },
        { value: "EN CURSO", label: "En curso" },
        { value: "EVALUADO", label: "Evaluado" },
      ],
    },
  ],
];

export default function EvaluationHistoryScreen() {
  const { files, getFilesByUser } = useGetEvaluationsByUserHook();
  const { generate } = useGenerateEvaluationHook();
  const { deleteEvaluation } = useDeleteEvaluationHook();
  const { updateEvaluation, loading: updating } = useUpdateEvaluationHook();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [toDeleteId, setToDeleteId] = useState<string>("");

  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getFilesByUser();
    console.log("Files:", files);
  }, [getFilesByUser]);

  useEffect(() => {
    setTableData(
      files.map(r => ({
        id: r.id,
        id_fundanet: r.id_fundanet,
        correo_estudiante: r.correo_estudiante,
        file: r.file.split("uploads/")[1],
        tipo_error: r.tipo_error,
        aprobado: r.aprobado ? "approved" : "notapproved",
        estado: r.estado,
        createdAt: new Date(r.createdAt).toISOString().split("T")[0],
        updatedAt: new Date(r.updatedAt).toISOString().split("T")[0],
      }))
    );
  }, [files]);

  const handleEdit = (row: any) => {
    setEditingRow(row);
    setModalOpen(true);
  };
  const handleVerMas = (row: any) => {
    if (row.estado === "PENDIENTE") generate(row.id);
    navigate(`/evaluacion/${row.id}`);
  };
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

  // 4️⃣ Inyectar defaultValue en campos de edición
  const editModalFields: FormField[][] = editingRow
    ? baseEditFields.map(group =>
      group.map(field => ({
        ...field,
        defaultValue: String((editingRow as any)[field.key] ?? ""),
      }))
    )
    : baseEditFields;

  // 5️⃣ Al enviar edición
  const handleEditSubmit = async (data: any) => {
    if (!editingRow) return;
    const params = {
      correo_estudiante: data.correo_estudiante,
      tipo_error: data.tipo_error,
      aprobado: data.aprobado === "true",
      estado: data.estado,
    };
    await updateEvaluation(editingRow.id, params);
    // actualizar localmente la fila
    setTableData(prev =>
      prev.map(item =>
        item.id === editingRow.id
          ? {
            ...item,
            ...params,
            aprobado: params.aprobado ? "approved" : "notapproved",
            updatedAt: new Date().toISOString().split("T")[0],
          }
          : item
      )
    );
    setModalOpen(false);
    setEditingRow(null);
  };

  const columnsConfig = createColumnsConfig({
    onEdit: handleEdit,
    onVerMas: handleVerMas,
    onDelete: handleDelete,
  });

  return (
    <EvaluationHistoryTemplate
      data={tableData}
      columnsConfig={columnsConfig}

      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogChange={setDeleteDialogOpen}
      onConfirmDelete={handleConfirmDelete}
      confirmValue={confirmValue}
      onConfirmValueChange={setConfirmValue}

      open={modalOpen}
      onOpenChange={open => {
        setModalOpen(open);
        if (!open) setEditingRow(null);
      }}
      modalFormFields={editModalFields}
      onModalSubmit={handleEditSubmit}
      modalSuccessToast={{
        title: "Evaluación actualizada",
        description: "Cambios guardados correctamente.",
        icon: "✅",
        closeButton: true,
      }}
      modalErrorToast={{
        title: "Error al actualizar",
        description: "No se pudieron guardar los cambios.",
        icon: "🚫",
        closeButton: true,
      }}
    />
  );
}
