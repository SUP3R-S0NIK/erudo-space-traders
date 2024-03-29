/**
 * DTO comportant les informations d'authentification
 */
export interface AuthDto {
    //Login
    login: string;
    //Mot de passe
    password: string;
    //Garder la session ouverte
    rememberMe: boolean;
}
