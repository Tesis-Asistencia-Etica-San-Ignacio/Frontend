import AuthTemplate from "@/components/templates/AuthTemplate";
import { FormField } from "@/components/molecules/Dynamic-form";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional" },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña" },
];

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Tu nombre" },
  { type: "user", key: "last_name", placeholder: "Tu apellido" },
  { type: "email", key: "email", placeholder: "Tu correo" },
  { type: "password", key: "password", placeholder: "Contraseña" },
];

export default function AuthScreen() {
  const { userType, login, createAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si ya estás en la ruta correspondiente, no navegues de nuevo (para evitar bucles)
    if (userType === "EVALUADOR" && location.pathname !== "/estadisticas") {
      navigate("/estadisticas");
    } else if (userType === "INVESTIGADOR" && location.pathname !== "/evaluacion") {
      navigate("/evaluacion");
    }
  }, [userType, location.pathname, navigate]);

  // Inicia sesión y deja que el useEffect haga la navegación
  const handleLogin = async (credentials: { email: string; password: string }) => {
    await login(credentials.email, credentials.password);
  };

  const handleRegister = async (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => {
    await createAccount(data);
    await login(data.email, data.password);
  };

  return (
    <AuthTemplate
      loginFields={loginFields}
      registryFields={registryFields}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
