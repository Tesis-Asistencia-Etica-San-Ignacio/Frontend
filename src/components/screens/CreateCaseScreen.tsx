import { CreateCaseTemplate } from "@/components/templates/CreateCaseTemplate";
import { FormField } from "@/types/formTypes";
import useGeneratePdfInvestigator from "@/hooks/pdf/useGeneratePdfByInvestigator"

import PdfRenderer from "../organisms/PdfRenderer";
import { useState } from "react";

export default function CreateCaseScreen() {
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const { fetchPdfInvestigator, pdfUrl, loading } = useGeneratePdfInvestigator();
    
    
      const handlePreviewPdf = async (formData: any) => {
        const url = await fetchPdfInvestigator(formData)
        if (url) setPdfModalOpen(true)
      }
      const handlePdfModalFormSubmit = async () => {
        setPdfModalOpen(false)
      }
      
    const modalFormFields: FormField[][] = [
      [
        {
          type: "custom",
          key: "pdfPreview",
          placeholder: "Vista previa PDF",
          component: <PdfRenderer url={pdfUrl} externalLoading={loading} />,
          required: false,
        },
      ]
  ]
  

  return (
      <CreateCaseTemplate
        onPreviewPdf={handlePreviewPdf}
        modalOpen={pdfModalOpen}
        modalFormFields={modalFormFields}
        onModalOpenChange={setPdfModalOpen}
        onModalSubmit={handlePdfModalFormSubmit}
        pdfUrl={pdfUrl}
        loading={loading}
      />
    );
}
