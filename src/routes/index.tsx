// src/routes/index.tsx
import { useAuthContext } from "@/context/AuthContext";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy de componentes principales
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/screens/DashboardScreen"));
const Dropfiles = lazy(() => import("../components/screens/DropFilesScreen"));
const FileHistory = lazy(
  () => import("../components/screens/FileHistoryScreen")
);
const Landing = lazy(() => import("../components/templates/LandingTemplate"));
const Prueba = lazy(() => import("../components/templates/TestCrud"));
const Evaluation = lazy(() => import("../components/screens/EvaluationScreen"));

// Lazy de rutas de rol
const EvaluatorRoutes = lazy(() => import("./EvaluatorRoutes"));
const ResearcherRoutes = lazy(() => import("./ResearcherRoutes"));

export const AppRoutes = () => {
  const { isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    return <div>Cargando sesión...</div>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/" element={<Layout />}>
            {/* Rutas para evaluadores */}
            <Route element={<EvaluatorRoutes />}>
              <Route path="estadisticas" element={<Dashboard />} />
              <Route path="subir-archivos" element={<Dropfiles />} />
              <Route path="inicio" element={<Landing />} />
              <Route path="historial-archivos" element={<FileHistory />} />
            </Route>
            {/* Rutas para investigadores */}
            <Route element={<ResearcherRoutes />}>
              <Route path="prueba" element={<Prueba />} />
            </Route>
              <Route path="evaluacion" element={<Evaluation />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
