import FileHistoryTemplate from "../templates/FileHistoryTemplate";
import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
} from "lucide-react";
import { ColumnConfig } from "@/types/table";
import { useEffect, useState } from "react";
import useGetEvaluationsByUserHook from "../../hooks/evaluation/useGetEvaluationByUser";

// Configuración de las columnas para la tabla
const columnsConfig: ColumnConfig[] = [
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
            { label: "Edit" },
            { label: "Ver más" },
            { label: "Delete" },
        ],
    },
];

// Función para formatear las fechas (YYYY-MM-DD)
const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
};

// Función para transformar la URL y extraer el nombre del archivo
const transformFile = (url: string): string => {
    const keyword = "uploads/";
    const idx = url.indexOf(keyword);
    if (idx !== -1) {
        return url.substring(idx + keyword.length);
    }
    return url;
};

// Función para transformar la data: formatea las fechas, el archivo y ajusta el valor de "aprobado"
const transformData = (data: any[]) => {
    return data.map((row) => ({
        id: row.id,
        correo_estudiante: row.correo_estudiante,
        file: transformFile(row.file),
        // Convierte el booleano a valor esperado en la columna (approved/notapproved)
        aprobado: row.aprobado ? "approved" : "notapproved",
        // Se transforma el estado a mayúsculas para que coincida con las opciones definidas
        estado: row.estado.toUpperCase(),
        createdAt: formatDate(row.createdAt),
        updatedAt: formatDate(row.updatedAt),
        // Se omiten fecha_inicial, fecha_final y uid
    }));
};

export default function FileHistoryScreen() {
    const { files, getFilesByUser } = useGetEvaluationsByUserHook();
    const [tableData, setTableData] = useState<any[]>([]);

    // Disparamos la consulta para obtener las evaluaciones
    useEffect(() => {
        getFilesByUser();
    }, [getFilesByUser]);

    // Cuando la data de "files" cambie, la transformamos y actualizamos el estado local
    useEffect(() => {
        if (files && Array.isArray(files) && files.length) {
            const transformed = transformData(files);
            setTableData(transformed);
        }
    }, [files]);

    return (
        <div>
            <FileHistoryTemplate data={tableData} columnsConfig={columnsConfig} />
        </div>
    );
}
