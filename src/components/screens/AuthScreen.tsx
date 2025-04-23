// screens/AuthScreen.tsx
import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import AuthTemplate from "@/components/templates/AuthTemplate";
import type { FormField } from "@/types/formTypes";
import { Slide } from "../molecules/Carousel";

const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa tu nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Ingresa tu apellido", required: true },
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];

const slides: Slide[] = [
  {
    imageUrl: "src/assets/bg-Medicina.jpg",
    title: "Bienvenido",
    description: "Al sistema de asistencia a la evaluación ética del HUSI",
  },
  {
    imageUrl: "src/assets/ponti.jpg",
    title: "Último Slide",
    description: "Pequeña descripción final",
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
