import { useQuery } from "@tanstack/react-query";
import { getCasesByUser } from "@/services/caseService";
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from "@/lib/api/constants";
import { useNotify } from "@/hooks/useNotify";

export default function useGetCasesByUserHook() {
  const { notifyError } = useNotify();

  const {
    data = [],          // ← lista de cases
    isLoading,
    isError,
    error,
  } = useQuery<any[], Error>({
    queryKey: QUERY_KEYS.CASES,
    queryFn: getCasesByUser,
    ...DEFAULT_QUERY_OPTIONS,
  });

  // notificación de error
  if (isError && error instanceof Error) {
    notifyError({
      title: "Error cargando casos",
      description: error.message,
      closeButton: true,
    });
  }

  /* NOTA: devuelvo `files` para no tocar tu pantalla   */
  return { files: data, isLoading };
}
