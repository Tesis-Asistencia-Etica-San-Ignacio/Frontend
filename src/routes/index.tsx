import { useAuthContext } from "@/context/AuthContext"
import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const Auth = lazy(() => import("../components/screens/AuthScreen"))
const Layout = lazy(() => import("../components/templates/Layout"))
const Dashboard = lazy(() => import("../components/screens/DashboardScreen"))
const Dropfiles = lazy(() => import("../components/screens/DropFilesScreen"))
const FileHistory = lazy(() => import("../components/screens/FileHistoryScreen"))
const Landing = lazy(() => import("../components/templates/LandingTemplate"))
const Prueba = lazy(() => import("../components/templates/TestCrud"))
const Evaluation = lazy(() => import("../components/templates/EvaluationResultTemplate"))

export const AppRoutes = () => {
    const { userType, isAuthLoading } = useAuthContext()

    if (isAuthLoading) {
        return <div>Cargando sesión...</div>
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<Auth />} />

                    {/* Rutas protegidas */}
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="estadisticas"
                            element={userType === "EVALUADOR" ? <Dashboard /> : <Navigate to="/auth" />}
                        />
                        <Route
                            path="subir-archivos"
                            element={userType === "EVALUADOR" ? <Dropfiles /> : <Navigate to="/auth" />}
                        />
                        <Route
                            path="historial-archivos"
                            element={userType === "EVALUADOR" ? <FileHistory /> : <Navigate to="/auth" />}
                        />
                        <Route path="inicio" element={<Landing />} />
                        <Route
                            path="evaluacion"
                            element={userType === "INVESTIGADOR" ? <Evaluation /> : <Navigate to="/auth" />}
                        />
                        <Route
                            path="prueba"
                            element={userType === "INVESTIGADOR" ? <Prueba /> : <Navigate to="/auth" />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
