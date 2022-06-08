import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import ResponsiveAppBar from './Menu'
import UserDraw from '../Modules/UserDraw';
import UserBets from '../Modules/UserBets';

function DashboardContent() {
  return (
    <>
      <ResponsiveAppBar/>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ display:'flex', flexWrap: 'nowrap'}}>
              <Grid item xs={12} md={8} lg={9}>
                <UserDraw />
              </Grid>

              <Grid item xs={12} md={8} lg={9}>
                <UserBets />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}