import { useState, useCallback, useRef, useEffect } from "react";
import { generatePdfInvestigator } from "@/services/pdfService";
import { useNotify } from "@/hooks/useNotify";

const useGeneratePdfInvestigator = () => {
  const [pdfUrl, setPdfUrl] = useState("");       // url expuesta
  const [loading, setLoading] = useState(false);
  const { notifySuccess, notifyError } = useNotify();
  const prevUrlRef = useRef<string>("");            // ← guarda la última

  const fetchPdfInvestigator = useCallback(async (data: any) => {
    if (!data) return "";
    setLoading(true);
    try {
      const blob = await generatePdfInvestigator(data);
      const objectUrl = URL.createObjectURL(blob);

      /* libera la url previa (si existe) */
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = objectUrl;

      setPdfUrl(objectUrl);
      notifySuccess({
        title: "PDF generado",
        description: "Vista previa disponible.",
        icon: "✅",
        closeButton: true,
      });
      return objectUrl;
    } catch (err: any) {
      console.error("Error al generar PDF:", err);
      notifyError({
        title: "Error PDF",
        description: err?.message ?? "No se pudo generar la vista previa.",
        closeButton: true,
      });
      return "";
    } finally {
      setLoading(false);
    }
  }, []);                   //  ← sin dependencias

  /* limpia url al desmontar */
  useEffect(() => () => {
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
  }, []);

  return { pdfUrl, loading, fetchPdfInvestigator };
};

export default useGeneratePdfInvestigator;

