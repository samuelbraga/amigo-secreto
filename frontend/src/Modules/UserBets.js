import * as React from 'react';

import { Typography, Paper } from '@mui/material';

const UserBets = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography component="div" variant="h5" sx={{ mb: 2 }}>
        Amigos Secretos que Participo
      </Typography>
      <span>Você não participa de nenhum sorteio de terceiros ainda :(</span>
    </Paper>
  );
}

export default UserBets;