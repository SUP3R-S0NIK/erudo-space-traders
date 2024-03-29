import axios from 'axios';
import {getValueLocalStorage} from '../hooks/use-local-storage.hook';
import globalRouter from '../hooks/globalRouter';
import {tokenIsExpired} from '../hooks/auth-verify.hook';

//Création d'axios avec une url de base
export const axiosCore = axios.create();

//Intercepteur sur les requests.
//Il permet de rajouter le bearer quand il est présent dans le localStorage
axiosCore?.interceptors.request.use(config => {
    config.headers = config.headers ?? {};
    //Intercepteur sur les requests.
    //Il permet de rajouter le bearer quand il est présent dans le localStorage
    const user = getValueLocalStorage('user');
    if (user != null) {
        config.headers['Authorization'] = 'Bearer ' + user.token;
        const controller = new AbortController();
        if (user?.token && globalRouter.navigate && tokenIsExpired(user?.token)) {
            globalRouter.navigate('/');
            controller.abort();
            return {
                ...config,
                signal: controller.signal,
            };
        }
    }
    //Intercepteur sur les requests.
    //Il permet de rajouter le bearer quand il est présent dans le localStorage

    if (config.method !== undefined && ['patch'].includes(config.method)) {
        config.headers['content-type'] = 'application/merge-patch+json';
    }

    if (config.method !== undefined && ['patch'].includes(config.method)) {
        config.headers['content-type'] = 'application/merge-patch+json';
    }

    if (config.method !== undefined && ['post', 'put', 'patch'].includes(config.method)) {
        config.data = cleanJSON(config.data);
    }
    return config;
});

/**
 * Add json cleaner to set undefined/null values to empty string.
 * This is to prevent axios(json to string using jsonify) from removing those keys
 * when converting json payload to string.
 */
function cleanJSON(json: any) {
    for (const key in json) {
        if (json[key] === undefined || json[key] === null) {
            json[key] = '';
        } else if (typeof json[key] === 'object') {
            json[key] = cleanJSON(json[key]);
        }
    }
    return json;
}
