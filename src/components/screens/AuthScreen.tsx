import AuthTemplate from "@/components/templates/AuthTemplate";
import { FormField } from "@/types/formTypes";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGeneratePdf } from '@/hooks/useGeneratePdf';
import { Slide } from "../molecules/Carousel";


const loginFields: FormField[] = [
  { type: "email", key: "email", placeholder: "Ingresa tu correo institucional", required: true },
  { type: "password", key: "password", placeholder: "Ingresa tu contraseña", required: true },
];

const registryFields: FormField[] = [
  { type: "user", key: "name", placeholder: "Ingresa tu nombre", required: true },
  { type: "user", key: "last_name", placeholder: "Ingresa tu apeliido", required: true },
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
    imageUrl: "src/assets/anime-4k-pictures-s6fzu24pgsaxtsfb.jpg",
    title: "Otra sección",
    description: "Información relevante para el usuario",
  },
  {
    imageUrl: "src/assets/bg-Medicina.jpg",
    title: "Último Slide",
    description: "Pequeña descripción final",
  },
]


//Ejemplo de uso
/* const registryFields: FormField[][] = [
  [
    {
      type: "email",
      key: "email",
      placeholder: "Tu correo institucional",
      required: true,
    },
    {
      type: "select",
      key: "country",
      placeholder: "País",
      required: true,
      options: [
        { value: "mx", label: "México" },
        { value: "us", label: "Estados Unidos" },
      ],
      selectPlaceholder: "Selecciona un país",
    },
  ],
  [
    {
      type: "custom",
      key: "customField",
      placeholder: "Campo personalizado",
      component: (
        <Button variant="outline" className="w-full">
          Campo personalizado
        </Button>
      ),
    },
  ],
  [
    {
      type: "password",
      key: "password",
      placeholder: "Contraseña",
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    {
      type: "extension-phone",
      key: "extension",
      placeholder: "Extensión",
      required: false,
      width: 50,
    },
  ],
  [
    {
      type: "phone",
      key: "phone",
      placeholder: "Teléfono",
      required: true,
      minLength: 7,
      maxLength: 10,
    },
    {
      type: "document",
      key: "document",
      placeholder: "Documento",
      required: true,
      minLength: 8,
    },
    {
      type: "address",
      key: "address",
      placeholder: "Dirección",
      required: true,
    },
  ],
  [
    {
      type: "user",
      key: "username",
      placeholder: "Usuario",
      required: true,
    },
    {
      type: "textarea",
      key: "bio",
      placeholder: "Biografía (auto ajustable)",
      required: false,
      autoAdjust: false, 
      width: 50,
    },
  ],
] */

export default function AuthScreen() {
  const { user, login, createAccount } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  //esto lo tengo que quitar (es para crear los pdf)
  const { mutate: generatePdfMutation } = useGeneratePdf();

  useEffect(() => {
    if (user) {
      if (user.type === "EVALUADOR" && location.pathname !== "/estadisticas") {
        navigate("/estadisticas");
      } else if (user.type === "INVESTIGADOR" && location.pathname !== "/historial-archivos") {
        navigate("/historial-archivos");
      }
    }
  }, [user, location.pathname, navigate]);
  // Inicia sesión y deja que el useEffect haga la navegación
  const handleLogin = async (credentials: { email: string; password: string }) => {
    /* generatePdfMutation({
      userName: credentials.email,
      userType: userType || "INVESTIGADOR",
      date: new Date().toLocaleString()
    }); */
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
      slides={slides}
    />
  );
}
