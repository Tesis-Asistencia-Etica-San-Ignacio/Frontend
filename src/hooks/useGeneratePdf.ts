// src/hooks/useGeneratePdf.ts
import { useMutation } from '@tanstack/react-query';
import { generatePdf } from '../services/pdfService';

export function useGeneratePdf() {
    return useMutation<Blob, Error, { userName: string, userType: string, date: string }>({
        mutationFn: async (data) => {
            const pdfBlob = await generatePdf(data);
            // Crea una URL del objeto para descargarlo
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'auth.pdf');
            document.body.appendChild(link);
            link.click();
            // Limpieza: remover el link y revocar la URL
            link.remove();
            window.URL.revokeObjectURL(url);
            return pdfBlob;
        },
    });
}
