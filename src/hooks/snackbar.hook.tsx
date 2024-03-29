import {Alert, Snackbar} from '@mui/material';
import React, {createContext, useContext, useMemo, useState} from 'react';
import {AlertColor} from '@mui/material/Alert/Alert';

//Dto pour les alertes
export interface AlertDto {
    severity: AlertColor;
    message: string;
}

//Object pour définir les actions possibles: success, error, info alert
export interface ShowMessage {
    successAlert: (message: string) => void;
    errorAlert: (message: string) => void;
    infoAlert: (message: string) => void;
}

export const SnackbarContext = createContext<ShowMessage>({
    successAlert: () => {
    },
    errorAlert: () => {
    },
    infoAlert: () => {
    },
});

/**
 * Provider qui permet de gérer les messages à afficher dans l'application
 * @param children composant enfant
 * @constructor
 */
export function SnackbarProvider({children}: any) {
    //Init des useState
    const [alert, setAlert] = useState<AlertDto>();
    const [visible, setVisible] = useState(false);

    //Implémentation des méthodes qui definissent et affichent les messages
    const showMessage: ShowMessage = useMemo(() => {
        const successAlert = (message: string): void => {
            setAlert({
                severity: 'success',
                message,
            });
            display();
        };
        const errorAlert = (message: string) => {
            setAlert({severity: 'error', message});
            display();
        };
        const infoAlert = (message: string) => {
            setAlert({severity: 'info', message});
            display();
        };
        return {successAlert, errorAlert, infoAlert};
    }, []);

    const display = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    //Méthode pour fermer la snackBar
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setVisible(false);
    };

    //Retourne un snackBar avec le message et sa severité.
    return (
        <SnackbarContext.Provider value={showMessage}>
            {children}
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={visible} autoHideDuration={5000}
                      onClose={hide}>
                <Alert severity={alert?.severity} sx={{whiteSpace: 'pre-line'}} onClose={handleClose}>
                    {alert?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useSnackbars = () => useContext(SnackbarContext);
