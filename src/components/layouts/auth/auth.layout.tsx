import { Suspense, useEffect } from 'react';
import { Await, useLoaderData, useNavigate, useOutlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { AuthProvider } from '../../../hooks/use-auth.hook';
import globalRouter from '../../../hooks/globalRouter';

/**
 * Composant de type Layout
 *
 * Ce layout a deux objectifs :
 *  1. S'assurer que l'utilisateur voie que le chargement de la page est en cours, c'est donc lui qui possède le loader du chargement.
 *  2. Récupérer l'utilisateur connecté afin de le fournir rapidement aux composants parents et d'ainsi éviter les erreurs classiques de récupérations asynchrones.
 *
 * @constructor
 */
export default function AuthLayout() {
    // Récupère le composant à afficher par la route demandé à ce niveau de la hiérarchie
    const outlet = useOutlet();
    // useNavigate
    globalRouter.navigate = useNavigate();

    // Récupération des informations de l'utilisateur connecté
    const { userPromise }: any = useLoaderData();

    //Gestion du loader au chargement de la page
    useEffect(() => {
        const loaderElement = document.querySelector('.loader-container');
        if (loaderElement) {
            loaderElement.remove();
        }
    });
    // Composition du loader
    return (
        <Suspense fallback={<LinearProgress />}>
            <Await
                resolve={userPromise}
                errorElement={<Alert severity="error">Une erreur est survenue lors de votre connexion</Alert>}
                children={user => <AuthProvider userData={user}>{outlet}</AuthProvider>}
            />
        </Suspense>
    );
}
