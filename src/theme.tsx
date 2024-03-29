/* istanbul ignore file */

import { createTheme, formLabelClasses, PaletteColor, PaletteColorOptions } from '@mui/material';

// Titre, texte courant
const work = 'Work Sans, sans-serif';

// Base du LOGO
const arial = 'Arial, sans-serif';

// Surtitres, inter-titres, exergues
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        neutral: true;
    }
}

// Style des box
declare module '@mui/material/Box' {
    interface BoxPropsVariantOverrides {
        greyBox: true;
    }
}

// Création de la palette de couleurs
declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        orange?: PaletteColorOptions;
        orangeHover?: PaletteColorOptions;
        green?: PaletteColorOptions;
        darkGrey?: PaletteColorOptions;
    }

    interface Palette {
        orange: PaletteColor;
        orangeHover: PaletteColor;
        green: PaletteColor;
        darkGrey: PaletteColor;
    }
}

/**
 * Ajout des couleurs dans un Theme pour l'ajouter dans le theme principal
 */
const data = createTheme({
    palette: {
        orange: {
            main: '#f68712',
        },
        orangeHover: {
            main: '#e47a0a',
        },
        green: {
            main: '#80d3af',
        },
        darkGrey: {
            main: '#4b4b4e',
        },
    },
});

/**
 * Theme avec en paramètre les couleurs
 * Et contenant le design SCSS de chaque component utilisé dans l'application
 */
const theme = createTheme(data, {
    data,
    components: {
        // Liens hypertexte
        MuiLink: {
            styleOverrides: {
                root: {
                    color: data.palette.green.main,
                    fontFamily: work,
                },
            },
        },
        // Paper
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: data.palette.orange.light,
                    borderRadius: '3px',
                },
            },
        },
        // Cards
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                    borderRadius: '3px',
                },
            },
        },
        // Inputs
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontFamily: work,
                },
            },
        },
        // Labels d'inputs
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: work,
                    color: data.palette.orange.main,
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: data.palette.orange.main,
                    [`&.${formLabelClasses.focused}`]: {
                        color: data.palette.orange.main,
                        borderBottomColor: data.palette.orange.main,
                    },
                },
            },
        },
        // Typographies
        MuiTypography: {
            styleOverrides: {
                h2:{
                    [data.breakpoints.down('md')]: {
                        fontSize: '2.5rem',
                    },
                    textAlign:"center",
                    fontWeight: 'unset',
                },
                h3:{
                    fontWeight: 'bold',
                },
                h4: {
                    marginBottom: '20px',
                    fontFamily: work,
                    fontSize: 'xxx-large',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    [data.breakpoints.down('md')]: {
                        fontSize: 'xx-large',
                    },
                    color: data.palette.darkGrey.main,
                },
                h5: {
                    fontFamily: work,
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    letterSpacing: '2px',
                    color: data.palette.darkGrey.main,
                },
                h6: {
                    fontFamily: work,
                    fontSize: 'small',
                    color: data.palette.darkGrey.main,
                },
                body1: {
                    fontFamily: work,
                },
                body2: {
                    fontFamily: arial,
                },
            },
        },
        // Boutons
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: {
                        textAlign: 'center',
                        color: '#ffffff',
                        backgroundColor: data.palette.orange.main,
                        '&:hover': {
                            color: '#000',
                            backgroundColor: data.palette.orangeHover.main,
                        },
                        fontFamily: work,
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        textAlign: 'center',
                        color: data.palette.orange.main,
                        border: '1px solid',
                        borderColor: data.palette.orange,
                        backgroundColor: '#fff',
                        '&:hover': {
                            border: 'none',
                            color: '#000',
                            backgroundColor: data.palette.orange,
                        },
                        fontFamily: work,
                    },
                },
                {
                    props: { variant: 'neutral' },
                    style: {
                        textAlign: 'center',
                        color: data.palette.orange.main,
                        backgroundColor: data.palette.darkGrey.main,
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: data.palette.darkGrey.main,
                        },
                        fontFamily: work,
                    },
                },
                {
                    props: { variant: 'link' },
                    style: {
                        textAlign: 'center',
                        color: data.palette.orange.main,
                        border: 'none',
                        backgroundColor: '#fff',
                        '&:hover': {
                            color: '#000',
                            backgroundColor: data.palette.orange,
                        },
                        fontFamily: work,
                    },
                },
            ],
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '20px',
                    [`&.${formLabelClasses.focused}`]: {
                        borderBottomColor: data.palette.orange.main,
                    },
                    // Default state of underline.
                    '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl::before': {
                        borderBottomColor: data.palette.orange.main,
                    },

                    // On hover state of underline.
                    '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl:hover::before': {
                        borderBottomColor: data.palette.orange.main,
                    },

                    // On focus state of underline.
                    '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.Mui-focused::after': {
                        borderBottom: '2px solid #f8b334',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    marginBottom: '20px',
                },
            },
        },
    },
});

export default theme;
