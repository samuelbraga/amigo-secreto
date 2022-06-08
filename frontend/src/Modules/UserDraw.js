import React, { useState, useEffect } from "react";

import { Box, Typography, Paper } from '@mui/material';

import SorteioCard from '../Components/Card';

import UserGroup from "../Services/getGroup";

const user = JSON.parse(sessionStorage.getItem('user'));
const token = user['tokenBearer'];

const UserDraw = () => {
  const [groups, setGroups] = useState('')

  useEffect(() => {
    UserGroup({ token: token })
      .then((res) => {
        console.log(res)
        setGroups(res.data)
      })
      .catch((error) => {
        console.log('Não foi possivel recuperar os dados')
      })
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'block', my: 2 }}>
        <Typography component="div" variant="h5">
          Meus Amigos Secretos
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SorteioCard />
        <SorteioCard />
      </Box>
    </Paper>
  );
}

export default UserDraw;