import { emailApi } from "@/lib/api/emailApi";

export interface SendEmailInput {
    to: string;
    subject: string;
    mensajeAdicional?: string;
    evaluationId: string;        // ← nuevo campo
  }
  
  export async function sendEmail({
    to,
    subject,
    mensajeAdicional,
    evaluationId             // ← lo recibimos aquí
  }: SendEmailInput): Promise<void> {
    await emailApi.post("smtp/send-email", {
      to,
      infoMail: { subject, mensajeAdicional },
      evaluationId            // ← lo enviamos al backend
    });
  }
  