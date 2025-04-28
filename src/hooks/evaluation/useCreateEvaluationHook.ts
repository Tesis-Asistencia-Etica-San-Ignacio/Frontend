import { useState, useCallback } from "react"
import { uploadFile } from "@/services/evaluationService"
import type { FileWithUrl } from "@/types/fileType"
import { useNotify } from "@/hooks/useNotify"

export default function useCreateEvaluationHook() {
  const [loading, setLoading] = useState(false)
  const { notifySuccess, notifyError } = useNotify()

  /**
   * @param files  lista de FileWithUrl
   * @param onProgress índice y porcentaje
   */
  const uploadFiles = useCallback(
    async (
      files: FileWithUrl[],
      onProgress: (index: number, percent: number) => void
    ) => {
      setLoading(true)
      try {
        for (let i = 0; i < files.length; i++) {
          const f = files[i]
          if (f.error) continue

          const form = new FormData()
          form.append("file", f.file)

          // Subida real con progreso
          await uploadFile(form, (e) => {
            if (!e.total) return
            const pct = Math.round((e.loaded / e.total) * 100)
            onProgress(i, pct)
          })

          notifySuccess({
            title: `Archivo ${f.name} subido`,
            description: "Se ha subido correctamente.",
            closeButton: true,
          })
        }
      } catch (err: any) {
        console.error("Error al subir archivos:", err)
        notifyError({
          title: "Error subiendo archivos",
          description: err?.message ?? "Revise la consola para más detalles.",
          closeButton: true,
        })
      } finally {
        setLoading(false)
      }
    },
    [notifySuccess, notifyError]
  )

  return { uploadFiles, loading }
}
