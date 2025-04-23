import { useRef } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import AccountTemplate from "@/components/templates/settings/AccountTemplate";
import { FormField } from "@/types/formTypes";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useUpdatePassword } from "@/hooks/user/useUpdatePassword";
import { ConfirmDialogProps } from "@/components/organisms/dialogs/ConfirmDialog";

export default function AccountScreen() {
    const { user } = useAuthContext();
    const accountFormRef = useRef<DynamicFormHandles | null>(null);
    const passwordFormRef = useRef<DynamicFormHandles | null>(null);
    const { mutateAsync: updateUser } = useUpdateUser();
    const { mutateAsync: updatePassword } = useUpdatePassword();

    const onConfirmAccount = async () => {
        await accountFormRef.current?.handleSubmit(async (data) => {
            await updateUser(data);
        })();
    };

    const onConfirmPassword = async () => {
        await passwordFormRef.current?.handleSubmit(async ({ password }) => {
            await updatePassword({ password });
        })();
    };

    const accountFields: FormField[] = [
        { type: "user", key: "name", placeholder: "Nombre", required: true },
        { type: "user", key: "last_name", placeholder: "Apellido", required: true },
        { type: "email", key: "email", placeholder: "Correo electrónico", required: true },
    ];

    const passwordFields: FormField[] = [
        {
            type: "password",
            key: "password",
            placeholder: "Nueva contraseña",
            required: true,
            minLength: 6,
            maxLength: 50,
        },
    ];

    const accountSuccessToast: ConfirmDialogProps["successToast"] = {
        title: "Cuenta actualizada",
        description: "Se guardaron los cambios de tu cuenta.",
        icon: "✅",
        closeButton: true,
    };
    const accountErrorToast: ConfirmDialogProps["errorToast"] = {
        title: "Error al actualizar cuenta",
        description: "No se pudieron guardar los cambios.",
        icon: "🚫",
        closeButton: true,
    };
    const passwordSuccessToast: ConfirmDialogProps["successToast"] = {
        title: "Contraseña actualizada",
        description: "Tu nueva contraseña ha sido guardada.",
        icon: "✅",
        closeButton: true,
    };
    const passwordErrorToast: ConfirmDialogProps["errorToast"] = {
        title: "Error al actualizar contraseña",
        description: "No se pudo actualizar tu contraseña.",
        icon: "🚫",
        closeButton: true,
    };

    return (
        <AccountTemplate
            title="Mi Cuenta"
            desc="Actualiza la información de tu cuenta."
            accountFields={accountFields}
            passwordFields={passwordFields}
            accountFormRef={accountFormRef}
            passwordFormRef={passwordFormRef}
            onConfirmAccount={onConfirmAccount}
            onConfirmPassword={onConfirmPassword}
            accountInitialData={{
                name: user?.name ?? "",
                last_name: user?.last_name ?? "",
                email: user?.email ?? "",
            }}
            passwordInitialData={{}}
            accountSuccessToast={accountSuccessToast}
            accountErrorToast={accountErrorToast}
            passwordSuccessToast={passwordSuccessToast}
            passwordErrorToast={passwordErrorToast}
        />
    );
}
