import { LoadingFallback } from "@/components/molecules/LoadingFallback";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// componentes principales
const Auth = lazy(() => import("../components/screens/AuthScreen"));
const Layout = lazy(() => import("../components/screens/LayoutScreen"));
const Dashboard = lazy(() => import("../components/screens/DashboardScreen"));
const Dropfiles = lazy(() => import("../components/screens/DropFilesScreen"));
const FileHistory = lazy(() => import("../components/screens/FileHistoryScreen"));
const Landing = lazy(() => import("../components/templates/LandingTemplate"));
const Evaluation = lazy(() => import("../components/screens/EvaluationScreen"));
const UnauthorizedErrorScreen = lazy(() => import("../components/screens/errors/401"));

// rutas de rol
const EvaluatorRoutes = lazy(() => import("./EvaluatorRoutes"));
const ResearcherRoutes = lazy(() => import("./ResearcherRoutes"));
// rutas de ajustes
const Settings = lazy(() => import("../components/screens/settings/SettingsScreen"));
const Appearance = lazy(() => import("../components/screens/settings/AppearanceScreen"));
const Account = lazy(() => import("../components/screens/settings/AccountScreen"));
const Prompts = lazy(() => import("../components/screens/settings/PromptsScreen"));
export const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/no-autorizado" element={<UnauthorizedErrorScreen />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/" element={<Layout />}>
            <Route path="/ajustes" element={<Settings />} >
              <Route path="apariencia" element={<Appearance />} />
              <Route path="cuenta" element={<Account />} />
              <Route path="prompts" element={<Prompts />} />
            </Route>
            {/* Rutas para evaluadores */}
            <Route element={<EvaluatorRoutes />}>
              <Route path="estadisticas" element={<Dashboard />} />
              <Route path="subir-archivos" element={<Dropfiles />} />
              <Route path="inicio" element={<Landing />} />
              <Route path="historial-archivos-evaluados" element={<FileHistory />} />
            </Route>
            {/* Rutas para investigadores */}
            <Route element={<ResearcherRoutes />}>
              <Route path="historial-archivos" element={<FileHistory />} />
              <Route path="evaluacion" element={<Evaluation />} />
              {/* </Route> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
