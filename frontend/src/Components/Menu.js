import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Logo from '../Assets/AmigoSecreto.png'
import { AppContext } from '../Context/AppContext'

const ResponsiveAppBar = () => {
  const { setShowLogin } = React.useContext(AppContext)
  return (
    <AppBar position="static" style={{ backgroundColor: '#FFF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: 'space-between'}}>
          <img src={Logo} alt="Logo amigo secreto" />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Login">
              <Button
                variant="contained"
                type="submit"
                onClick={() => setShowLogin(true)}
                style={{ backgroundColor:"#147A12" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar