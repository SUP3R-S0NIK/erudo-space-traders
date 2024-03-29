import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';

/**
 * Layout entourant toutes les pages de l'application
 * @constructor
 */
export default function GlobalLayout() {
    // Intégration du header dans les pages
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Outlet />
        </>
    );
}
