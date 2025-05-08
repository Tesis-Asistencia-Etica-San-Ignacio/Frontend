import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AuthTemplate from "@/components/templates/AuthTemplate";
import type { FormField } from "@/types/formTypes";
import { Slide } from "../molecules/Carousel";
import bgMedicina from "@/assets/bg-Medicina.jpg";
import ponti from "@/assets/ponti.jpg";


const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true, minLength: 6 },
];

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa tu nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Ingresa tu apellido", required: true },
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true, minLength: 6 },
];

const slides: Slide[] = [
  {
    imageUrl: bgMedicina,
    title: "Bienvenido",
    description: "Al sistema de asistencia a la evaluación ética del HUSI",
  },
  {
    imageUrl: ponti,
    title: "Únete a nosotros",
    description: "Ayuda a mejorar la calidad de la investigación en salud",
  },
];

export default function AuthScreen() {
  const { user, login, createAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (user.type === "EVALUADOR" && location.pathname !== "/estadisticas") {
        navigate("/estadisticas");
      } else if (user.type === "INVESTIGADOR" && location.pathname !== "/historial-archivos") {
        navigate("/historial-archivos");
      }
    }
  }, [user, location.pathname, navigate]);

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
      slides={slides}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
