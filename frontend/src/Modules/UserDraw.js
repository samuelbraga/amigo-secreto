import * as React from 'react';

import { Box, Typography, Paper } from '@mui/material';

import SorteioCard from '../Components/Card';

const UserDraw = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'block', my:2}}>
        <Typography component="div" variant="h5">
          Meus Sorteios
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
        <SorteioCard />
        <SorteioCard />
        <SorteioCard />
      </Box>
    </Paper>
  );
}

export default UserDraw;