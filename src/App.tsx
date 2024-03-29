import React from 'react';
import './App.css';
import LoginPage from './pages/login/login.page';
import { createBrowserRouter, createRoutesFromElements, defer, Navigate, Route, useLocation } from 'react-router-dom';
import AuthLayout from './components/layouts/auth/auth.layout';
import GlobalLayout from './components/layouts/global/global.layout';
import { useAuth } from './hooks/use-auth.hook';


/**
 * Récupération des données de l'utilisateur depuis le stockage local
 */
const getUserData = () =>
    new Promise(resolve => {
        const user = window.localStorage.getItem('user');
        resolve(user);
    });

/**
 * Crée un router pour l'app, englobé dans les layouts
 */
export const App = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />} loader={() => defer({ userPromise: getUserData() })}>
            <Route element={<GlobalLayout />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
        </Route>,
    ),
);

/**
 * Fonction vérifiant si l'user peut accéder à la page donnée ou doit être redirigé en fonction de son état d'authentification
 * @param children Element qui sera retourné si l'état d'authentification est correct
 * @param logged Bool qui détermine si la page nécessite d'être connecté ou déconnecté
 * @constructor
 */
export function CheckAuth({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        //On redirige si la personne est connectée
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
