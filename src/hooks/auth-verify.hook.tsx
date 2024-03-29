import {Buffer} from 'buffer';

/**
 * Méthode qui permet gérer les token expirés
 * @param authParams méthodes qui permettent de faire les bons traitements
 * @constructor
 */
export default function AuthVerify(authParams: any) {
    //Si la personne possède un token
    if (authParams?.user?.token && tokenIsExpired(authParams?.user?.token)) {
        // sinon on clear la session
        authParams?.expired();
    }
}

/**
 * Permet de savoir si un token est expiré
 * @param token token
 */
export function tokenIsExpired(token: any) {
    const mille = 1000;
    if (token) {
        let decodedJwt: any;
        try {
            //décode le jwtToken
            decodedJwt = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        } catch (e) {
            decodedJwt = null;
        }
        //On valide que l'utilisateur courant est un token valide
        if (decodedJwt?.exp * mille < Date.now()) {
            return true;
        }
    }
    return false;
}
