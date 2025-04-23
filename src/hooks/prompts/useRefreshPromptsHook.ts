import { useCallback } from "react";
import { resetMyPrompts } from "@/services/promptService";

const useRefreshPrompts = () => {
  const refreshPrompts = useCallback(async () => {
    await resetMyPrompts();
  }, []);

  return { refreshPrompts };
};

export default useRefreshPrompts;
