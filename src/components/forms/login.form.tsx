import {useState} from 'react';
import {Form, Formik, Field} from 'formik';
import {Button, Grid, IconButton, InputAdornment, Paper, Typography} from '@mui/material';
import InputForm from '../../components/common/input-form';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {object, string, boolean} from 'yup';
import {AuthDto} from '../../services/dtos/auth.dto';

/**
 * Affiche le formulaire de connexion
 * @param props handler du submit du formulaire & loading qui gère l'activation/désactivation du form
 * @constructor
 */
export default function LoginForm(props: { handlerSubmit: (e: AuthDto) => Promise<void>, loading: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    // mise à jour de la visibilité du mot de passe

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Définition des règles de validation
    const validationSchema = object({
        login: string().required("L'identifiant est obligatoire"),
        password: string().required('Le mot de passe est obligatoire'),
        rememberMe: boolean(),
    });

    // Valeurs initiales du formulaire (vide en gros)
    const initValues = {
        login: '',
        password: '',
        rememberMe: false,
    };

    return (
        <Paper sx={{padding: "1rem", borderRadius: 2}} className="paper-login" elevation={3}>
            <Typography variant="h5">Me connecter</Typography>
            {/*Formulaire*/}
            <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={props.handlerSubmit}>
                <Form name="login">
                    <Grid container direction={"column"} spacing={1} p={{xs: 2, md: 4}}>
                        {/*Champ texte Identifiant*/}
                        <InputForm id="login" name="login" label="Identifiant"/>
                        {/*Champ texte Mot de passe*/}
                        <InputForm
                            id="password"
                            name="password"
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="on"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton data-testid="eye-password" aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid item container direction={{xs: "column", md: "row"}}
                              justifyContent={{xs: "flex-start", md: "space-between"}}>

                            {/*<label="Se souvenir de moi !"/>*/}
                            <label>
                                <Field type="checkbox" name="rememberMe" label="Se souvenir de moi !"/>
                                Se souvenir de moi !
                            </label>

                            <Button disabled={props.loading} type="submit" variant="contained" data-testid={'submit'}>
                                Me connecter
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Paper>
    );
}