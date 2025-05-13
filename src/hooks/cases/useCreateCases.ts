import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase } from "@/services/caseService";
import { QUERY_KEYS } from "@/lib/api/constants";
import { useNotify } from "@/hooks/useNotify";

export default function useCreateCaseHook() {
  const qc = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  const mutation = useMutation<any, Error, Record<string, any>>({
    mutationFn: createCase,
    onSuccess: newCase => {
      qc.setQueryData<any[]>(QUERY_KEYS.CASES, old =>
        old ? [...old, newCase] : [newCase]
      );

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
    createCase: (data: Record<string, any>) => mutation.mutateAsync(data),
    loading: mutation.isPending,
  };
}
