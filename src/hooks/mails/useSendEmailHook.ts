import { useMutation } from "@tanstack/react-query";
import { sendEmail, SendEmailInput } from "@/services/emailService";

export function useSendEmail() {
  return useMutation<void, unknown, SendEmailInput>({
    mutationFn: sendEmail,
  });
}
