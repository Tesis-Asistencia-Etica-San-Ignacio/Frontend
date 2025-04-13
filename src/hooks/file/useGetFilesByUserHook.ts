import { useState, useCallback } from "react";
import { toast } from "sonner";
import { authApi } from "@/lib/api/authApi"

export interface FileItem {
  id: string;
  name: string;
  size: number;
  url: string;
  // Agrega otros campos según lo que devuelva tu API
}

const useGetFilesByUserHook = () => {
  //const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getFilesByUser = useCallback(async () => {
    setLoading(true);
    try {
      // Se utiliza el endpoint que devuelve las evaluaciones del usuario autenticado
      const response = await authApi.get("/evaluacion/my");
      console.log("Evaluaciones del usuario:", response.data);

      // Si el endpoint devuelve evaluaciones que contienen la información del archivo,
      // puedes transformar la respuesta para extraer únicamente los archivos. Por ejemplo:
      // const userFiles = response.data.map((evaluation: any) => evaluation.file);
      // setFiles(userFiles);

      // Si el endpoint ya devuelve directamente la lista de archivos:
      // setFiles(response.data);
    } catch (error) {
      console.error("Error al obtener los archivos del usuario:", error);
      toast.error("Error al obtener los archivos del usuario");
    }
    setLoading(false);
  }, []);

  //return { files, getFilesByUser, loading };
  return { getFilesByUser, loading };
};

export default useGetFilesByUserHook;
