import { axiosCore } from './http-core-service';
import { AuthDto } from './dtos/auth.dto';

/**
 * Méthode d'appel au back pour la récupération du token de connexion
 *
 * @param auth
 */
export const login = async (auth: AuthDto) => {
    const data = {username: auth.login, password: auth.password, rememberMe: auth.rememberMe };
    const response = await axiosCore.post(process.env.REACT_APP_URL_BACK + '/api/authenticate', data);
    return response.data.id_token;
};
