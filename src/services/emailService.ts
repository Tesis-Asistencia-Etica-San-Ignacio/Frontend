import { emailApi } from "@/lib/api/emailApi";

export interface SendEmailInput {
    to: string;
    subject: string;
    mensajeAdicional?: string;
}

export async function sendEmail({ to, subject, mensajeAdicional }: SendEmailInput): Promise<void> {
    await emailApi.post("smtp/send-email", {
        to,
        infoMail: {
            subject,
            mensajeAdicional,
        },
    });
}
