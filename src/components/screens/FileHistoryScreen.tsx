import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileHistoryTemplate from "../templates/FileHistoryTemplate";
import { CheckCircle, Circle } from "lucide-react";
import { ColumnConfig } from "@/types/table";
import useGetEvaluationsByUserHook from "@/hooks/evaluation/useGetEvaluationByUser";
import useGenerateEvaluationHook from "@/hooks/ia/useGenerateAnalisisHook";
import useDeleteEvaluationHook from "@/hooks/evaluation/useDeleteEvaluationHook";

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
    alert("Editar: " + row.id);
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

  useEffect(() => {
    getFilesByUser();
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
    />
  );
}
