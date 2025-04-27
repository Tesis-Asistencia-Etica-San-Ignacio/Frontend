// src/hooks/pdf/useGeneratePdfByEvaluationId.ts
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { generatePdfByEvaluationId } from "@/services/pdfService";

const useGeneratePdfByEvaluationId = (evaluationId: string) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPdf = useCallback(async () => {
    if (!evaluationId) return;
    setLoading(true);
    try {
      const blob = await generatePdfByEvaluationId(evaluationId);
      const objectUrl = URL.createObjectURL(blob);
      setPdfUrl(objectUrl);
      console.log("PDF generado:", objectUrl);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      toast.error("Error al generar vista previa del PDF", { closeButton: true });
    } finally {
      setLoading(false);
    }
  }, [evaluationId]);

  return { pdfUrl, fetchPdf, loading };
};

export default useGeneratePdfByEvaluationId;
