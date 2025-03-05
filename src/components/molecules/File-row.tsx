import React, { forwardRef } from "react"
import { File as FileIcon, FileText, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/atoms/ui/progress"
import { Button } from "@/components/atoms/ui/button"

export interface FileRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    fileUrl: string
    name: string
    size: number
    error?: boolean
    progress?: number // Si quieres manejar progreso real
    onRemove?: () => void
}

const FileRow = forwardRef<HTMLTableRowElement, FileRowProps>(
    ({ fileUrl, name, size, error, progress, onRemove, className, ...props }, ref) => {
        // Determina si es imagen o PDF
        const isImage = /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(name)
        const isPdf = /\.pdf$/i.test(name)

        return (
            <tr ref={ref} className={cn("", className)} {...props}>
                {/* Preview */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="relative flex h-12 w-20 items-center justify-center">
                        {error ? (
                            <span className="text-red-500">Error</span>
                        ) : isImage ? (
                            <img src={fileUrl} alt={name} className="object-contain h-full w-full" />
                        ) : isPdf ? (
                            <FileText className="h-6 w-6 text-red-500" />
                        ) : (
                            <FileIcon className="h-6 w-6 text-gray-500" />
                        )}
                    </div>
                </td>
                {/* Nombre */}
                <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium">
                    <span>{name}</span>
                </td>
                {/* Tamaño (KB) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {(size / 1024).toFixed(1)} KB
                </td>
                {/* Status (Progress) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Progress value={progress ?? 100} isError={error} className="w-20" />
                </td>
                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {onRemove && (
                        <Button variant="destructive" size="sm" onClick={onRemove}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </td>
            </tr>
        )
    }
)

FileRow.displayName = "FileRow"
export default FileRow
