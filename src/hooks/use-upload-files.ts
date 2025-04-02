// src/hooks/useUploadFiles.ts
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface FileWithUrl {
  file: File;       
  name: string;
  size: number;
  url: string;      
  error?: boolean;
}

function useUploadFiles() {
  const [loading, setLoading] = useState(false);

  const uploadFiles = useCallback(async (files: FileWithUrl[]) => {
    setLoading(true);
    for (const fileObj of files) {
      // Evita subir archivos con error de validación
      if (fileObj.error) continue;
      // debbug
      console.log("Enviando archivo:", fileObj.file);

      const formData = new FormData();
      // La clave "file" debe coincidir con lo que espera Multer en el backend
      formData.append("file", fileObj.file);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/files/upload", {
            method: "POST",
            headers: {
              // No modifiques el Content-Type; FormData lo gestiona automáticamente
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
        if (response.ok) {
          toast.success(`Archivo ${fileObj.name} subido correctamente`);
        } else {
          toast.error(`Error al subir ${fileObj.name}`);
        }
      } catch (error) {
        toast.error(`Error al subir ${fileObj.name}`);
        console.error("Error al subir el archivo:", error);
      }
    }
    setLoading(false);
  }, []);

  return { uploadFiles, loading };
}

export default useUploadFiles;
