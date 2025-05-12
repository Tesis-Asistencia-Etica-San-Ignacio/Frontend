import { useState, useEffect } from "react";
import type { ColumnConfig } from "@/types/table";
import type { FormField } from "@/types/formTypes";
import useGetCasesByUser from "@/hooks/cases/useGetCasesByUser";
import useDeleteCases from "@/hooks/cases/useDeleteCases";
import useUpdateCases from "@/hooks/cases/useUpdateCases";
import ModalForm from "@/components/organisms/dialogs/ModalForm";
import PdfRenderer from "@/components/organisms/PdfRenderer";
import HistoryTemplate from "../templates/HistoryTemplate";
import useFetchCasePdf from "@/hooks/cases/useFetchCasesPdf";

export default function CaseHistoryScreen() {
  // ──────────────────────── hooks y estados ────────────────────────────────
  const { files, getFilesByUser } = useGetCasesByUser();

  const { deleteCase} = useDeleteCases();
  const { updateCase } = useUpdateCases();

  const [tableData, setTableData] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [toDeleteId, setToDeleteId] = useState<string>("");

  // edición
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  //pdf

  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const { pdfUrl, fetchCasePdf, loading: pdfLoading } = useFetchCasePdf();


  // ───────────────────────────── efectos ───────────────────────────────────
  useEffect(() => {
    getFilesByUser();
  }, [getFilesByUser]);

  useEffect(() => {
    setTableData(
      files.map(f => ({
        id: f.id,
        nombre_proyecto: f.nombre_proyecto,
        version: f.version,
        fecha: f.fecha,
      //  file: f.file.split("uploads/")[1],
        pdf: f.pdf,
        codigo: f.codigo,
        createdAt: new Date(f.createdAt).toISOString().split("T")[0],
        updatedAt: new Date(f.updatedAt).toISOString().split("T")[0],
      }))
    );
  }, [files]);

  // ───────────────────── handlers de la tabla ──────────────────────────────

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleViewPdf  = async (row: any) => {
    const parts = (row.pdf as string).split("/");
    const filename = parts[parts.length - 1];
    await fetchCasePdf(filename);
    setPdfModalOpen(true);
  }


  const handleDelete = (row: any) => {
    setToDeleteId(row.id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCase(toDeleteId);
    setDeleteDialogOpen(false);
    setConfirmValue("");
    getFilesByUser();
  };

  // ───────────────────── submit de edición ────────────────────────────────
  const handleEditSubmit = async (data: any) => {
    if (!selectedRow) return;
    const params = {
      nombre_proyecto: data.nombre_proyecto,
      tipo_error: data.tipo_error,
      version: data.version,
      codigo: data.codigo,
    };
    await updateCase(selectedRow.id, params);
    setTableData(prev =>
      prev.map(r =>
        r.id === selectedRow.id
          ? {
            ...r,
            ...params,
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
      nombre_proyecto: selectedRow.nombre_proyecto ?? "",
      version: selectedRow.version ?? "",
      codigo: selectedRow.codigo ?? "",
    }
    : {};


  // — Campos base para la edición —
  const editModalFields: FormField[][] = [
    [
      { type: "text", key: "nombre_proyecto", placeholder: "Nombre del proyecto" },
    ],
    [
      { type: "number", key: "version", placeholder: "Ingrese el número de la versión" },
    ],
    [
      { type: "text", key: "codigo", placeholder: "Código del proyecto" },
    ],
  ];

  // — Columnas de la tabla —
  const columnsConfig: ColumnConfig[] = [
   // { id: "id", accessorKey: "id", headerLabel: "ID", searchable: true },
   // { id: "fecha", accessorKey: "fecha", headerLabel: "Fecha", searchable: false },
    { id: "nombre_proyecto", accessorKey: "nombre_proyecto", headerLabel: "Nombre Proyecto", searchable: true },
    { id: "version", accessorKey: "version", headerLabel: "Versión", searchable: true },
    { id: "codigo", accessorKey: "codigo", headerLabel: "Código", searchable: true  },
    { id: "createdAt", accessorKey: "createdAt", headerLabel: "Creado" },
    { id: "updatedAt", accessorKey: "updatedAt", headerLabel: "Actualizado" },
    {
      id: "actions",
      type: "actions",
      actionItems: [
       // { label: "Editar", onClick: handleEdit },
        { label: "Eliminar", onClick: handleDelete },
        { label: "Ver PDF", onClick: handleViewPdf },
      ],
    },
  ];

  // ─────────────────────────── render ─────────────────────────────────────
  return (
    <HistoryTemplate
      /* ---------- Tabla ---------- */
      data={tableData}
      columnsConfig={columnsConfig}
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

      DataSelectedRow={editInitialData}

      /*-----PDF-----*/
      extraModal={
        <ModalForm
        open={pdfModalOpen}
        onOpenChange={open => {
          setPdfModalOpen(open);
          if (!open) URL.revokeObjectURL(pdfUrl);  // libera memoria
        }}
        title={{ text: "Ver Consentimiento Informado", align: "left" }}
        formDataConfig={[[
          {
            type: "custom",
            key: "pdfPreview",
            placeholder: "Vista previa",
            component: <PdfRenderer url={pdfUrl} externalLoading={pdfLoading} />,
            required: false,
          }
        ]]}
        onSubmit={() => setPdfModalOpen(false)}
        submitButtonText="Cerrar"
        width="70%"
        height="90%"
      />
      }
      /*-----Hide Columns-----*/
      hideColumns={["id", "fecha", "pdf"]}
    />
  );
}
