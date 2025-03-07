import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Carga perezosa (lazy) de componentes
const Login = lazy(() => import('../components/screens/LoginScreen'));
const Dashboard = lazy(() => import('../components/templates/DashBoard'));
/* const LandingPage = lazy(() => import('../components/template/LandingPage'));
const Registry = lazy(() => import('../components/screens/Registry'));
const BanksRoutes = lazy(() => import('./ejemploEscalable')); */

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login  />} />
                    <Route path="/Dashboard" element={<Dashboard  />} />
                    {/* <Route path="/landing-page" element={<LandingPage />} />
                    <Route path="/registry" element={<Registry />} /> */}
                    {/* Las rutas anidadas para bancos */}
                    {/* <Route path="/banks/*" element={<BanksRoutes />} /> */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
