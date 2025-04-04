import { LoadingFallback } from "@/components/molecules/LoadingFallback";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy de componentes principales
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/templates/Layout"));
const Dashboard = lazy(() => import("../components/screens/DashboardScreen"));
const Dropfiles = lazy(() => import("../components/screens/DropFilesScreen"));
const FileHistory = lazy(() => import("../components/screens/FileHistoryScreen"));
const Landing = lazy(() => import("../components/templates/LandingTemplate"));
const Evaluation = lazy(() => import("../components/screens/EvaluationScreen"));
const UnauthorizedErrorScreen = lazy(() => import("../components/screens/errors/401"));
const Settings = lazy(() => import("../components/templates/SettingsTemplate"));

// Lazy de rutas de rol
const EvaluatorRoutes = lazy(() => import("./EvaluatorRoutes"));
const ResearcherRoutes = lazy(() => import("./ResearcherRoutes"));

export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/no-autorizado" element={<UnauthorizedErrorScreen />} />

          <Route path="/" element={<Layout />}>
          <Route path="/settings" element={<Settings />} />
            {/* Rutas para evaluadores */}
            <Route element={<EvaluatorRoutes />}>
              <Route path="estadisticas" element={<Dashboard />} />
              <Route path="subir-archivos" element={<Dropfiles />} />
              <Route path="inicio" element={<Landing />} />
              <Route path="historial-archivos-evaluados" element={<FileHistory />} />
            </Route>
            {/* Rutas para investigadores */}
            <Route element={<ResearcherRoutes />}>
              <Route path="evaluacion" element={<Evaluation />} />
              <Route path="historial-archivos" element={<FileHistory />} />
              {/* </Route> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
