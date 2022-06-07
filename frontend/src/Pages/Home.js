import CadastroUsuario from "../Components/CadastroUsuario"
import ResponsiveAppBar from "../Components/Menu"
import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HomeIcon from '../Assets/home.png'
import Login from "../Components/Login";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <Login />
      <Grid alignItems="center" display="flex" container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
          <Grid item xs={7} padding="50px">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              borderRadius="10px"
            >
            <Typography component="h1" variant="h4" width="70%">
              Organize e <span style={{ color:"#2DD23D" }}>sorteie</span> seu Amigo Secreto com muita facilidade e rapidez!
            </Typography>
            <img src={HomeIcon} alt="Home" />

          </Box>
          </Grid>
          <Grid item xs={4}>
            <CadastroUsuario />
          </Grid>
      </Grid>
    </div>
  );
}

export default Home;