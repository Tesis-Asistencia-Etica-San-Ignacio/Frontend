import { useMutation } from "@tanstack/react-query";
import { sendEmail, SendEmailInput } from "@/services/emailService";
import { useNotify } from "@/hooks/useNotify";

export function useSendEmail() {
  const { notifySuccess, notifyError } = useNotify();

  return useMutation<void, unknown, SendEmailInput>({
    mutationFn: sendEmail,
    onSuccess: () => {
      notifySuccess({
        title: "Correo enviado",
        description: "El email se envió con éxito.",
        closeButton: true,
      });
    },
    onError: (error: any) => {
      console.error("Error al enviar email:", error);
      notifyError({
        title: "Error enviando correo",
        description: error?.message ?? "Ocurrió un problema al enviar el correo.",
        closeButton: true,
      });
    },
  });
}
