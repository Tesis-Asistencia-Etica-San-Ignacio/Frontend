// FileInput.tsx
import React, { forwardRef, useReducer, useState, ChangeEvent, DragEvent } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import useUploadFiles, { FileWithUrl } from "@/hooks/use-upload-files";
import FileRow from "@/components/molecules/FileRowDropFile"
import { cn } from "@/lib/utils"

const MAX_FILES = 30
const SIMULATION_SPEED = 50000 // bytes por segundo, velocidad simulada para procesar el archivo


type Action =
    | { type: "ADD_FILES"; payload: FileWithUrl[] }
    | { type: "REMOVE_FILE"; payload: number }
    | { type: "UPDATE_PROGRESS"; payload: { index: number, progress: number } }

type State = FileWithUrl[];

function fileReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_FILES": {
            // Comprobamos si rebasamos el límite
            if (state.length + action.payload.length > MAX_FILES) {
                // ACA SE PERSONALIZA COMO SON LAS TOAST
                toast("Límite alcanzado", {
                    description: `Ya tienes ${state.length} archivos, y el máximo es ${MAX_FILES}.`,
                    closeButton: true,
                    icon: "🚫",
                })
                return state
            }
            return [...state, ...action.payload]
        }
        case "REMOVE_FILE": {
            const newState = [...state]
            newState.splice(action.payload, 1)
            return newState
        }
        case "UPDATE_PROGRESS": {
            return state.map((file, idx) =>
                idx === action.payload.index ? { ...file, progress: action.payload.progress } : file
            )
        }
        default:
            return state
    }
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> { }

    const FileInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
        const [files, dispatch] = useReducer(fileReducer, []);
        const [dragActive, setDragActive] = useState(false);
        const { uploadFiles, loading } = useUploadFiles();
        const noFiles = files.length === 0;

        // Valida si es imagen o PDF
        const validateFileType = (file: File) => {
            const isImage = /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(file.name);
            const isPdf = /\.pdf$/i.test(file.name);
            return isImage || isPdf;
        };
    
    // Función para simular la carga del archivo basada en su tamaño
    const simulateProgress = (index: number, fileSize: number) => {
    const totalDuration = (fileSize / SIMULATION_SPEED) * 1000; // duración total en ms
    const updateInterval = 100; // intervalo de actualización en ms
    const progressIncrement = (updateInterval / totalDuration) * 100;
    let progress = 0;
    const interval = setInterval(() => {
        progress += progressIncrement;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        dispatch({ type: "UPDATE_PROGRESS", payload: { index, progress: Math.round(progress) } });
    }, updateInterval);
}

// Drag & drop events
const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
};
const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
};
const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
};
const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!droppedFiles.length) return;

    const newFiles: FileWithUrl[] = droppedFiles.map((file) => {
        const isValid = validateFileType(file)
        if (!isValid) {
            toast.error(`El archivo ${file.name} no es PDF ni imagen.`, {
                closeButton: true,
                icon: "🚫"
            })
        }
        return {
            file,
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            error: !isValid,
            progress: 0,
        }
    })
    const startIndex = files.length;
    dispatch({ type: "ADD_FILES", payload: newFiles })
    newFiles.forEach((file, i) => {
        if (!file.error) {
            simulateProgress(startIndex + i, file.size);
        }
    })
}

// Input de archivos (click en el contenedor)
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const newFiles: FileWithUrl[] = Array.from(fileList).map((file) => {
        const isValid = validateFileType(file)
        if (!isValid) {
            toast.error(`El archivo ${file.name} no es PDF ni imagen.`, {
                closeButton: true,
                icon: "🚫"
            })
        }
        return {
            file,
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            error: !isValid,
            progress: 0,
        }
    })
    dispatch({ type: "ADD_FILES", payload: newFiles })
}

// Eliminar archivo
const handleRemoveFile = (index: number) => {
    dispatch({ type: "REMOVE_FILE", payload: index });
};

// Al hacer click en el contenedor vacío, abre el input
const handleClickContainer = () => {
    const fileInput = document.getElementById("dropzone-file");
    fileInput?.click();
};

return (
    <div className="w-full h-full">
        <div
            className={cn(
                "relative w-full  border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition ",
                dragActive && "bg-gray-100",
                noFiles ? "h-[95%]" : "h-fit",

                className
            )}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickContainer}
        >
            {noFiles ? (
                <>
                    <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click para subir archivos</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">hasta {MAX_FILES} archivos PDF</p>
                    <input
                        {...props}
                        ref={ref}
                        multiple
                        onChange={handleChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                    />
                </>
            ) : (
                <div className="w-full h-full flex flex-col">
                    <div className="overflow-x-auto rounded-3xl">
                        <div className=" min-w-full">
                            <div className="overflow-hidden border border-gray-300 rounded-3xl">
                                <table className="min-w-full divide-y divide-gray-300 ">
                                    <thead className="bg-gray-200 ">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                Previsualización
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                                                Tamaño
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                                                Progreso
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {files.map((file, index) => (
                                            <FileRow
                                                key={index}
                                                fileUrl={file.url}
                                                name={file.name}
                                                size={file.size}
                                                error={file.error}
                                                progress={file.progress}
                                                onRemove={() => handleRemoveFile(index)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                {/* Botón para añadir más archivos */}
                                <label
                                    htmlFor="more-files"
                                    className="flex items-center justify-center py-2 border-t border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <Plus className="w-6 h-6 text-gray-500" />
                                    <input
                                        {...props}
                                        ref={ref}
                                        multiple
                                        onChange={handleChange}
                                        type="file"
                                        id="more-files"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => uploadFiles(files)}
            disabled={loading}
        >
            {loading ? "Subiendo..." : "Subir Archivos"}
        </button>
    </div>
        );
    }
);

FileInput.displayName = "FileInput";
export default FileInput;
