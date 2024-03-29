import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import LoginForm from './../../components/forms/login.form';
import LogoPartition from '../../assets/images/partition.png';
import { useAuth } from '../../hooks/use-auth.hook';
import { AuthDto } from '../../services/dtos/auth.dto';
import 'react-toastify/dist/ReactToastify.css';


/**
 * Page de connexion de Partition
 * @constructor
 */
export default function LoginPage() {
    const auth = useAuth();
    //Disable ou non le bouton de la validation
    const [loading, setLoading] = useState(false);

    // Comportement au submit du formulaire Login
    const handlerSubmit = async (e: AuthDto) => {
        setLoading(true);
        auth.signin(e);
        setLoading(false);
    };

    return (
        <Grid
            container
            alignItems="center"
            minHeight={'100vh'}
            justifyContent="center"
            spacing={{ xs: 4, sm: 4, md: 16 }}
            sx={{ flexDirection: { xs: 'column', md: 'row' }, p: { xs: 2, md: 4 } }}
        >
            <Grid item xs={10} sm={6} md={5}>
                <Grid item>
                    <Typography variant="h2" sx={{ textAlign: 'center' }}>
                        Bienvenue sur <Box sx={{ fontWeight: 'bold' }}>Partition</Box>
                    </Typography>
                </Grid>
                <Grid>
                    <img style={{ width: '100%' }} alt={'logo partition'} src={LogoPartition} />
                </Grid>
            </Grid>
            <Grid item xs={10} sm={6} md={5}>
                <LoginForm handlerSubmit={handlerSubmit} loading={loading} />
            </Grid>
        </Grid>
    );
}
