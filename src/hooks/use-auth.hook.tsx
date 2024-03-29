import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { useLocalStorage } from './use-local-storage.hook';
import { AuthDto } from '../services/dtos/auth.dto';
import { ConnectedUserDto } from '../services/dtos/connected-user-dto';
import { jwtDecode } from 'jwt-decode';
import AuthVerify from './auth-verify.hook';
import { useToast } from './toast.hook';

export interface AuthContextType {
    user: ConnectedUserDto | null;
    signin: (data?: AuthDto) => void;
    signout: () => void;
    expired: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signin: () => {throw new Error('not implemented')},
    signout: () => {throw new Error('not implemented')},
    expired: () => {throw new Error('not implemented')},
});

/**
 * Hook gérant la connexion et déconnexion
 * @param children Element React à afficher
 * @param userData Informations de l'utilisateur
 * @constructor
 */
export const AuthProvider = ({ children, userData }: { children: React.ReactNode; userData: any }) => {
    //State plus objects necessairesua provider
    const [user, setUser] = useLocalStorage('user', userData);
    const navigate = useNavigate();
    const toast = useToast();

    const value = useMemo(() => {
        const signin = async (data?: AuthDto) => {
            // Récupération du token, enregistrement de la connexion et retour à la page d'accueil
            if (data) {
                await login(data)
                    .then(async token => {
                        if (token) {
                            //On décode le token pour le récupérer sous forme d'objet
                            const userConnected: ConnectedUserDto = await jwtDecode(token);
                            userConnected.token = token;
                            await setUser(userConnected);
                        }
                        toast.success('Connexion réussie !');
                        navigate('/', { replace: true });
                    })
                    .catch(() => {
                        // Affichage d'erreur
                        toast.error('Identifiant ou mot de passe incorrect');
                    });
            }
        };
        const signout = async () => {
            // Suppression de la connexion et retour à la page d'accueil
            await setUser(null);
            navigate('/', { replace: true });
        };
        const expired = async () => {
            // Suppression de la connexion et retour à la page de connexion
            // Avec un message informant la personne
            await setUser(null);
            navigate('/');
            toast.info('Votre session a expiré. Merci de vous reconnecter.');
        };
        return { user, signin, signout, expired };
    }, [user, setUser, navigate]);

    // Vérifie le token
    AuthVerify(value);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
