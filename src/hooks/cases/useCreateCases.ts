import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase } from "@/services/caseService";
import { QUERY_KEYS } from "@/lib/api/constants";
import { useNotify } from "@/hooks/useNotify";

export default function useCreateCaseHook() {
  const qc = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  const mutation = useMutation<
    void,
    Error,
    { caseData: Record<string, any>; pdfId: string }
  >({
    mutationFn: ({ caseData, pdfId }) => createCase(caseData, pdfId),
    onSuccess: () => {
      // En lugar de hacer push de undefined, invalidamos para que
      // se reejecute useGetCasesByUserHook y traiga la lista real.
      qc.invalidateQueries({ queryKey: QUERY_KEYS.CASES });
      notifySuccess({
        title: "Caso guardado",
        description: "Se añadió al historial correctamente.",
        icon: "✅",
        closeButton: true,
      });
    },
    onError: err =>
      notifyError({
        title: "Error guardando caso",
        description: err.message,
        closeButton: true,
      }),
  });

  return {
    createCase: (caseData: Record<string, any>, pdfId: string) =>
      mutation.mutateAsync({ caseData, pdfId }),
  };
}
