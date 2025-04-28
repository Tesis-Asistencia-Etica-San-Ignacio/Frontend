import { useState, useCallback } from "react";
import { generatePdfByEvaluationId } from "@/services/pdfService";
import { useNotify } from "@/hooks/useNotify";

const useGeneratePdfByEvaluationId = (evaluationId: string) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { notifySuccess, notifyError } = useNotify();

  const fetchPdf = useCallback(async () => {
    if (!evaluationId) return;
    setLoading(true);
    try {
      const blob = await generatePdfByEvaluationId(evaluationId);
      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
      notifySuccess({
        title: "PDF generado",
        description: "Vista previa disponible.",
        closeButton: true,
      });
    } catch (error: any) {
      console.error("Error al generar PDF:", error);
      notifyError({
        title: "Error PDF",
        description: error?.message ?? "No se pudo generar la vista previa del PDF.",
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  }, [evaluationId, notifySuccess, notifyError]);

  return { pdfUrl, fetchPdf, loading };
};

export default useGeneratePdfByEvaluationId;
