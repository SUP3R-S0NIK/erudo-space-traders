/**
 * DTO comportant les informations utilisateur
 */
export interface ConnectedUserDto {
    id: number;
    sub: string,
    auth: string,
    lastName?: string;
    firstName?: string;
    exp?: number;
    iat?: number;
    username?: string;
    profilKey?: string;
    /** Token de sécurité enregistré lors de la connexion */
    token?: string;
}
