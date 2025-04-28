// src/hooks/user/useCreateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/api";
import { CreateUserInput, User } from "@/types";
import { createUser } from "@/services/userService";
import { useNotify } from "@/hooks/useNotify";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotify();

  return useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      notifySuccess({
        title: "Usuario creado",
        description: "El nuevo usuario se creó correctamente.",
        icon: '✅',
        closeButton: true,
      });
    },
    onError: (error: Error) => {
      console.error("Error creando usuario:", error);
      notifyError({
        title: "Error al crear usuario",
        description: error.message,
        closeButton: true,
      });
    },
  });
}
