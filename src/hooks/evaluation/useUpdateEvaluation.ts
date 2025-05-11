import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEvaluation } from '@/services/evaluationService';
import { DEFAULT_QUERY_OPTIONS, QUERY_KEYS } from '@/lib/api/constants';
import { useNotify } from '@/hooks/useNotify';
import type { UpdateEvaluationParams } from '@/types/evaluationType';

const useUpdateEvaluationHook = () => {
  const qc = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEvaluationParams }) =>
      updateEvaluation(id, data),
    ...DEFAULT_QUERY_OPTIONS,

    onSuccess: () => {
      notifySuccess({
        title: 'Evaluación actualizada',
        description: 'Cambios guardados correctamente.',
        closeButton: true,
        icon: '✅',
      });
    },
    onError: (error: any) => {
      notifyError({
        title: 'Error actualizando evaluación',
        description: error?.message,
        closeButton: true,
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.EVALUATIONS });
    },
  });

  return {
    updateEvaluation: (id: string, data: UpdateEvaluationParams) =>
      mutation.mutateAsync({ id, data }),
    loading: mutation.isPending,
  };
};

export default useUpdateEvaluationHook;
