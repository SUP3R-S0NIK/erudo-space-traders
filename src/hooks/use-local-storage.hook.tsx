import {useState} from 'react';

/**
 * Hook permettant d'enregistrer des données dans le stockage local.
 * @param keyName
 * @param defaultValue
 */
export const useLocalStorage = (keyName: string, defaultValue: string) => {
    // Récupération d'une valeur dans le stockage
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    // Enregistrement d'une valeur dans le stockage
    const setValue = (newValue: string) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

/**
 * Méthode qui permet de récupérer la valeur d'une clé dans le local storage
 * @param keyName
 */
export const getValueLocalStorage = (keyName: string) => {
    const value = window.localStorage.getItem(keyName);
    if (value) {
        return JSON.parse(value);
    } else {
        window.localStorage.setItem(keyName, JSON.stringify(null));
        return null;
    }
};
