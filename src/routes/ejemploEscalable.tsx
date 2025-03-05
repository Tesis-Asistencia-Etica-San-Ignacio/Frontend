/* import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';

const BanksList = lazy(() => import('../components/screens/BanksList'));
const BankTransactions = lazy(() => import('../components/screens/BankTransactions'));

const BanksRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthGuard>
                        <BanksList />
                    </AuthGuard>
                }
            />
            <Route
                path="transactions/:id/:name"
                element={
                    <AuthGuard>
                        <BankTransactions />
                    </AuthGuard>
                }
            />
        </Routes>
    );
};

export default BanksRoutes;
 */