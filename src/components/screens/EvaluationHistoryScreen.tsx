import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EvaluationHistoryTemplate from "../templates/EvaluationHistoryTemplate";
import useGetEvaluationsByUserHook from "@/hooks/evaluation/useGetEvaluationByUser";
import useGenerateEvaluationHook from "@/hooks/ia/useGenerateAnalisisHook";
import useDeleteEvaluationHook from "@/hooks/evaluation/useDeleteEvaluationHook";
import useUpdateEvaluationHook from "@/hooks/evaluation/useUpdateEvaluationHook";
import type { ColumnConfig } from "@/types/table";
import type { FormField } from "@/types/formTypes";
import { CheckCircle, Circle } from "lucide-react";

export default function EvaluationHistoryScreen() {
  // ──────────────────────── hooks y estados ────────────────────────────────
  const { files, getFilesByUser } = useGetEvaluationsByUserHook();
  const { generate } = useGenerateEvaluationHook();
  const { deleteEvaluation } = useDeleteEvaluationHook();
  const { updateEvaluation } = useUpdateEvaluationHook();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [toDeleteId, setToDeleteId] = useState<string>("");

  // edición
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // ───────────────────────────── efectos ───────────────────────────────────
  useEffect(() => {
    getFilesByUser();
  }, [getFilesByUser]);

  useEffect(() => {
    setTableData(
      files.map(f => ({
        id: f.id,
        id_fundanet: f.id_fundanet,
        correo_estudiante: f.correo_estudiante,
        file: f.file.split("uploads/")[1],
        tipo_error: f.tipo_error,
        aprobado: f.aprobado ? "approved" : "notapproved",
        estado: f.estado,
        createdAt: new Date(f.createdAt).toISOString().split("T")[0],
        updatedAt: new Date(f.updatedAt).toISOString().split("T")[0],
      }))
    );
  }, [files]);

  // ───────────────────── handlers de la tabla ──────────────────────────────
  const handleRowClick = (row: any) => {
    setSelectedRow(row);
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditModalOpen(true);
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

  // ───────────────────── submit de edición ────────────────────────────────
  const handleEditSubmit = async (data: any) => {
    if (!selectedRow) return;
    const params = {
      correo_estudiante: data.correo_estudiante,
      tipo_error: data.tipo_error,
      aprobado: data.aprobado === "true",
      estado: data.estado,
      id_fundanet: data.id_fundanet,
    };
    await updateEvaluation(selectedRow.id, params);
    setTableData(prev =>
      prev.map(r =>
        r.id === selectedRow.id
          ? {
            ...r,
            ...params,
            aprobado: params.aprobado ? "approved" : "notapproved",
            updatedAt: new Date().toISOString().split("T")[0],
          }
          : r
      )
    );
    setEditModalOpen(false);
  };

  // ─────────────────── datos iniciales del modal ──────────────────────────
  const editInitialData = selectedRow
    ? {
      id_fundanet: selectedRow.id_fundanet ?? "",
      correo_estudiante: selectedRow.correo_estudiante ?? "",
      tipo_error: selectedRow.tipo_error ?? "",
      aprobado: selectedRow.aprobado === "approved" ? "true" : "false",
      estado: selectedRow.estado ?? "",
    }
    : {};


  // — Campos base para la edición —
  const editModalFields: FormField[][] = [
    [
      { type: "document", key: "id_fundanet", placeholder: "ID del documento en FundaNet" },
    ],
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

  // — Columnas de la tabla —
  const columnsConfig: ColumnConfig[] = [
    { id: "id", accessorKey: "id", headerLabel: "ID", searchable: true },
    { id: "id_fundanet", accessorKey: "id_fundanet", headerLabel: "ID FundaNet", searchable: true },
    { id: "correo_estudiante", accessorKey: "correo_estudiante", headerLabel: "Correo Estudiante", searchable: true },
    { id: "file", accessorKey: "file", headerLabel: "Archivo" },
    { id: "tipo_error", accessorKey: "tipo_error", headerLabel: "Tipo de error" },
    {
      id: "aprobado",
      accessorKey: "aprobado",
      headerLabel: "Aprobado",
      items: [
        { value: "approved", label: "Aprobado", icon: CheckCircle, badgeVariant: "approved" },
        { value: "notapproved", label: "No aprobado", icon: Circle, badgeVariant: "notapproved" },
      ],
    },
    {
      id: "estado",
      accessorKey: "estado",
      headerLabel: "Estado",
      items: [
        { value: "PENDIENTE", label: "Pendiente" },
        { value: "EN CURSO", label: "En curso" },
        { value: "EVALUADO", label: "Evaluado" },
      ],
    },
    { id: "createdAt", accessorKey: "createdAt", headerLabel: "Creado" },
    { id: "updatedAt", accessorKey: "updatedAt", headerLabel: "Actualizado" },
    {
      id: "actions",
      type: "actions",
      actionItems: [
        { label: "Editar", onClick: handleEdit },
        { label: "Ver más", onClick: handleVerMas },
        { label: "Reevaluar", visible: r => r.estado === "EVALUADO" || r.estado === "EN CURSO" },
        { label: "Eliminar", onClick: handleDelete },
      ],
    },
  ];

  // — Toasts —
  const editSuccessToast = {
    title: "Evaluación actualizada",
    description: "Cambios guardados correctamente.",
    icon: "✅",
    closeButton: true,
  };
  const editErrorToast = {
    title: "Error al actualizar",
    description: "No se pudieron guardar los cambios.",
    icon: "🚫",
    closeButton: true,
  };

  // ─────────────────────────── render ─────────────────────────────────────
  return (
    <EvaluationHistoryTemplate
      /* ---------- Tabla ---------- */
      data={tableData}
      columnsConfig={columnsConfig}
      onRowClick={handleRowClick}
      selectedRowId={selectedRow?.id}

      /* -------- Eliminación ------ */
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogChange={setDeleteDialogOpen}
      onConfirmDelete={handleConfirmDelete}
      confirmValue={confirmValue}
      onConfirmValueChange={setConfirmValue}

      /* --------- Edición --------- */
      open={editModalOpen}
      onOpenChange={open => {
        setEditModalOpen(open);
        if (!open) setSelectedRow(null);
      }}
      modalFormFields={editModalFields}
      onModalSubmit={handleEditSubmit}
      modalSuccessToast={editSuccessToast}
      modalErrorToast={editErrorToast}
      DataSelectedRow={editInitialData}
    />
  );
}
