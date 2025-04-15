import { pdfApi } from '../lib/api/pdfApi';

export const generatePdf = async (data: { userName: string, userType: string, date: string }): Promise<Blob> => {
    const response = await pdfApi.post<Blob>('/pdf/generate', data, {
        responseType: 'blob',
    });
    return response.data;
};
