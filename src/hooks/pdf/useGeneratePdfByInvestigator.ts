import { useState, useCallback } from "react";
import { generatePdfInvestigator } from "@/services/pdfService";
import { useNotify } from "@/hooks/useNotify";

const useGeneratePdfInvestigator = () => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { notifySuccess, notifyError } = useNotify();

  const fetchPdfInvestigator = useCallback(async (data: any) => {
    if (!data) return "";
    setLoading(true);
    try {
      const blob = await generatePdfInvestigator(data);
      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
      notifySuccess({
        title: "PDF generado",
        description: "Vista previa disponible.",
        closeButton: true,
        icon: "✅",
      });
      return objectUrl;
    } catch (error: any) {
      console.error("Error al generar PDF investigador:", error);
      notifyError({
        title: "Error PDF",
        description: error?.message ?? "No se pudo generar la vista previa del PDF.",
        closeButton: true,
      });
      return "";
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  return { pdfUrl, fetchPdfInvestigator, loading };
};

export default useGeneratePdfInvestigator;
