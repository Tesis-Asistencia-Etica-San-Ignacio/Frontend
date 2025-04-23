import { notifySuccess, notifyError } from "@/lib/utils/notify";

export function useNotify() {
    return { notifySuccess, notifyError };
}
