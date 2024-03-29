import React, { createContext, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ToastContextType {
    info: (message: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
    info: () => {},
    success: () => {},
    error: () => {},
    warning: () => {},
});

/**
 * Provider qui implémente les notifications dans une snackbar
 * @param children Enfant du provider
 * @constructor
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useMemo(() => {
        const info = (message: string) => {
            toast.info(message);
        };
        const success = (message: string) => {
            toast.success(message);
        };
        const error = (message: string) => {
            toast.error(message);
        };
        const warning = (message: string) => {
            toast.warning(message);
        };

        return { info, success, error, warning };
    }, []);

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
