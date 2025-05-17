import { useRef } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import AccountTemplate from "@/components/templates/settings/AccountTemplate";
import { FormField } from "@/types/formTypes";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useUpdatePassword } from "@/hooks/user/useUpdatePassword";

export default function AccountScreen() {
  const { user } = useAuthContext();
  const accountFormRef = useRef<DynamicFormHandles>(null);
  const passwordFormRef = useRef<DynamicFormHandles>(null);

  const { updateUser } = useUpdateUser();
  const { updatePassword } = useUpdatePassword();

  const onConfirmAccount = async () => {
    await accountFormRef.current?.handleSubmit(updateUser)();
  };

  const onConfirmPassword = async () => {
    await passwordFormRef.current?.handleSubmit(
      async (values: { [key: string]: any }) => {
        const typedValues = values as { password: string; newPassword: string };
        await updatePassword(typedValues);
      }
    )();
  };

  const accountFields: FormField[] = [
    { type: "user", key: "name", placeholder: "Nombre", required: true },
    { type: "user", key: "last_name", placeholder: "Apellido", required: true },
    {
      type: "email",
      key: "email",
      placeholder: "Correo electrónico",
      required: true,
    },
  ];

  const passwordFields: FormField[] = [
    
    {
      type: "password",
      key: "password",
      placeholder: "Contraseña actual",
      required: true,
      minLength: 6,
    },
    {
      type: "password",
      key: "newPassword",
      placeholder: "Nueva contraseña",
      required: true,
      minLength: 6,
    },
  ];

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
    />
  );
}
