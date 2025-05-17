import { requestsApi } from "@/lib/api/requestsApi";
import type { FileItem } from "@/types/fileType";

/**
 * 1) Previsualiza el PDF del investigador.
 *    Devuelve el Blob y el pdfId que usaremos luego.
 */


/**
 * 2) Guarda el PDF previamente cacheado.
 *    Envía el mismo body + el header X-Pdf-Id.
 */
export const createCase = async (
  caseData: Record<string, any>,
  pdfId: string
): Promise<void> => {
  await requestsApi.post(
    "/cases",
    caseData,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Pdf-Id": pdfId         // el servidor usa req.get('X-Pdf-Id') para recuperar el buffer :contentReference[oaicite:2]{index=2}
      },
    }
  );
};

/**
 * • getCasesByUser y deleteCase permanecen igual.
 * • Ya no necesitas generatePdfInvestigator por separado.
 */
export const getCasesByUser = async (): Promise<FileItem[]> => {
  const response = await requestsApi.get("/cases/my");
  return response.data;
};

export const deleteCase = async (caseId: string): Promise<void> => {
  await requestsApi.delete(`/cases/${caseId}`);
};

export const getCasePdf = async (filename: string): Promise<Blob> => {
  // llama a tu endpoint que sirve el PDF
  const response = await requestsApi.get(`/files/pdf/${filename}`, {
    responseType: "blob"
  });
  return response.data;
};
