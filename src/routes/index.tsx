import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Carga perezosa (lazy) de componentes
const Login = lazy(() => import('../components/screens/AuthScreen'))
const Layout = lazy(() => import('../components/templates/Layout'))
const Dashboard = lazy(() => import('../components/screens/DashboardScreen'))
const Dropfiles = lazy(() => import('../components/screens/DropFilesScreen'))
const Page = lazy(() => import('../components/templates/TableTemplate'))
const Landing = lazy(() => import('../components/templates/LandingTemplate'))
const  Prueba= lazy(() => import('../components/templates/TestCrud'))
const Evaluation = lazy(() => import('../components/templates/EvaluationResultTemplate'))

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    {/* Redirige la raíz a /login */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Ruta login */}
                    <Route path="/login" element={<Login />} />

                    {/* Rutas con Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route path="estadisticas" element={<Dashboard />} />
                        <Route path="subir-archivos" element={<Dropfiles />} />
                        <Route path="historial-archivos" element={<Page />} />
                        <Route path="inicio" element={<Landing />} />
                        <Route path="evaluacion" element={<Evaluation/>}/>
                        <Route path="prueba" element={<Prueba />} />
                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
