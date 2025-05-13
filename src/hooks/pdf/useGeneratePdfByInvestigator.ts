// en useGeneratePdfByInvestigator.ts
import { useState, useCallback, useRef, useEffect } from "react";
import { generatePdfInvestigator } from "@/services/pdfService";
import { useNotify } from "@/hooks/useNotify";

const useGeneratePdfInvestigator = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();
  const prevUrlRef = useRef<string>("");

  const fetchPdfInvestigator = useCallback(async (data: any) => {
    if (!data) return "";
    setLoading(true);
    try {
      const blob = await generatePdfInvestigator(data);
      // revoca la anterior
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);

      const objectUrl = URL.createObjectURL(blob);
      prevUrlRef.current = objectUrl;
      setPdfUrl(objectUrl);

      notifySuccess({ title: "PDF generado", description: "Vista previa disponible.", icon: "✅", closeButton: true });
      return objectUrl;
    } catch (err: any) {
      console.error("Error al generar PDF:", err);
      notifyError({ title: "Error PDF", description: err?.message ?? "No se pudo generar vista previa.", closeButton: true });
      return "";
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  // limpia al desmontar el hook
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  // 👇 nuevo: función para revocar y limpiar manualmente
  const clearPdf = useCallback(() => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = "";
    }
    setPdfUrl("");
  }, []);

  return { fetchPdfInvestigator, pdfUrl, loading, clearPdf };
};

export default useGeneratePdfInvestigator;
