import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Carga perezosa (lazy) de componentes
const Login = lazy(() => import('../components/screens/AuthScreen'))
const Layout = lazy(() => import('../components/templates/Layout'))
const Dashboard = lazy(() => import('../components/screens/DashboardScreen'))
const Dropfiles = lazy(() => import('../components/screens/DropFilesScreen'))
const Table = lazy(() => import('../components/templates/TableTemplate'))

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
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="dropfiles" element={<Dropfiles />} />
                        <Route path="page" element={<Table />} />
                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
