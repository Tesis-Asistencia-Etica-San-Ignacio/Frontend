import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FileHistoryTemplate from "../templates/FileHistoryTemplate"
import { CheckCircle, Circle } from "lucide-react"
import { ColumnConfig } from "@/types/table"
import useGetEvaluationsByUserHook from "../../hooks/evaluation/useGetEvaluationByUser"
import useGenerateEvaluationHook from "@/hooks/ia/useGenerateAnalisisHook"

function createColumnsConfig({
    onEdit,
    onVerMas,
    onDelete,
}: {
    onEdit: (rowData: any) => void
    onVerMas: (rowData: any) => void
    onDelete: (rowData: any) => void
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
                    label: "Edit",
                    onClick: onEdit,
                },
                {
                    label: "Ver más",
                    onClick: onVerMas,
                },
                {
                    label : "Reevaluar"
                },
                {
                    label: "Delete",
                    onClick: onDelete,
                },
            ],
        },
    ]
}

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toISOString().split("T")[0]
}

const transformFile = (url: string): string => {
    const keyword = "uploads/"
    const idx = url.indexOf(keyword)
    if (idx !== -1) {
        return url.substring(idx + keyword.length)
    }
    return url
}

const transformData = (data: any[]) => {
    return data.map((row) => ({
        id: row.id,
        correo_estudiante: row.correo_estudiante,
        file: transformFile(row.file),
        aprobado: row.aprobado ? "approved" : "notapproved",
        estado: row.estado?.toUpperCase?.() || "",
        createdAt: formatDate(row.createdAt),
        updatedAt: formatDate(row.updatedAt),
    }))
}

export default function FileHistoryScreen() {
    const { files, getFilesByUser } = useGetEvaluationsByUserHook()
    const { generate } = useGenerateEvaluationHook();
    const [tableData, setTableData] = useState<any[]>([])
    const navigate = useNavigate()

    const handleEdit = (rowData: any) => {
        alert("Editar: " + rowData.id)
    }

    const handleVerMas = (rowData: any) => {
        generate(rowData.id);
        navigate(`/evaluacion/${rowData.id}`)
    }

    const handleDelete = (rowData: any) => {
        const confirmed = window.confirm("¿Eliminar fila con ID " + rowData.id + "?")
        if (confirmed) {
            alert("Eliminado: " + rowData.id)
        }
    }
    
    const columnsConfig = createColumnsConfig({
        onEdit: handleEdit,
        onVerMas: handleVerMas,
        onDelete: handleDelete,
    })

    useEffect(() => {
        getFilesByUser()
    }, [getFilesByUser])

    useEffect(() => {
        if (files && Array.isArray(files) && files.length) {
            const transformed = transformData(files)
            setTableData(transformed)
        }
    }, [files])

    return (
        <div>
            <FileHistoryTemplate data={tableData} columnsConfig={columnsConfig} />
        </div>
    )
}
