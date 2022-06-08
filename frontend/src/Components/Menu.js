import * as React from 'react'
import {useLocation} from 'react-router-dom'

import {AppBar, Box, Typography, Stack, Toolbar, Container, Button, Tooltip } from '@mui/material'
import { AccountCircle, AddCircle, List, Logout } from '@mui/icons-material';

import Logo from '../Assets/AmigoSecreto.png'
import { AppContext } from '../Context/AppContext'

const user = JSON.parse(sessionStorage.getItem('user'));
const ResponsiveAppBar = () => {
  const { setShowLogin } = React.useContext(AppContext)
  const location = useLocation();
  const isHome = location.pathname == '/';

  const renderDashboardMenu = () => {
    const userName = user['name'];
    return (
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'right' }}>
        <Button variant="text" style={{ color:"#147A12" }}>
          <AddCircle sx={{ mr: 1 }}/>
          Criar Sorteio
        </Button>
        <Button variant="text" style={{ color:"#147A12" }}>
          <List sx={{ mr: 1 }}/>
          Meus Sorteios
        </Button>
        <Button variant="text" style={{ color:"#147A12" }} disabled>
          <AccountCircle sx={{ mr: 1, color:"#147A12", verticalAlign:'center' }}/>
          <Typography variant="overline" display="block" gutterBottom style={{ color:"#147A12" }}>
            {userName}
          </Typography>
        </Button>
        <Button variant="text" style={{ color:"#147A12" }}>
          <Logout sx={{ mr: 1 }}/>
          Sair
        </Button>
      </Stack>
    );
  }

  const renderLogoutMenu = () => {
    return (
      <Tooltip title="Login">
        <Button
          variant="contained"
          type="submit"
          onClick={() => setShowLogin(true)}
          style={{ backgroundColor:"#147A12" }}
          sx={{ mt: 3, marginBottom: '20%'}}
        >
          Entrar
        </Button>
      </Tooltip>
    );
  }

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: 'space-between'}}>
          <img src={Logo} alt="Logo amigo secreto" />
           <Box sx={{ flexGrow: 0 }}>
            {isHome ? renderLogoutMenu() : renderDashboardMenu()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar