import React, { useState, useEffect } from "react";

import { Box, Typography, Paper } from '@mui/material';

import SorteioCard from '../Components/Card';

import UserGroup from "../Services/getGroup";

const UserDraw = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const token = user ? user['tokenBearer'] : null;
    UserGroup({ token: token })
      .then((res) => {
        setGroups(res.data)
      })
      .catch((error) => {
        console.log('Não foi possivel recuperar os dados')
      })
  }, []);

  const formatAdress = (data) => {
    return  `${data.street}, ${data.neighborhood},${data.complement}, ${data.city} -  ${data.state}`
  } 

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'block', my: 2 }}>
        <Typography component="div" variant="h5">
          Meus Amigos Secretos
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        { groups ? groups.map((group) => (
          <SorteioCard
            adress={formatAdress(group)}
            date={group.event_date}
            name={group.description}
            participants={50}
            price={group.gift_value}
          />
        )): 'Você não possui nenhum sorteio cadastrado'}
        { !groups.length &&
          <span>Você não criou nenhum Amigo Secreto.</span> 
        }
      </Box>
    </Paper>
  );
}

export default UserDraw;