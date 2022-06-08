import * as React from 'react';

import { Box, Button, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Stack, Typography } from '@mui/material';
import { People, LocalAtm, Edit, EventAvailable, Place } from '@mui/icons-material';

export default function SorteioCard({
  adress,
  date,
  name,
  participants,
  price,
}) {

  const formatDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString('pt-BR');
  }

  const formatCurrency = (currency) => {
    const format = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
    return currency.toLocaleString('pt-BR', format);
  }

  const renderInfo = (icon, label) => {
    return (
      <ListItem>
        <ListItemAvatar>
          {icon}
        </ListItemAvatar>
        <ListItemText primary={label} />
      </ListItem>
    );
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Box sx={{ display: 'block'}}>
          <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography component="div" variant="h6" textAlign="left">
              {name}
            </Typography>
            <Edit sx={{ color: "#147A12" }}/>
          </Stack>
        </Box>
        
        <List sx={{ width: '100%' }}>
          {renderInfo(<People />, participants)}
          {renderInfo(<LocalAtm />,formatCurrency(price))}
          {renderInfo(<EventAvailable />, formatDate(date))}
          {renderInfo(<Place />, adress)}
        </List>

        <Stack spacing={2} direction="row" sx={{ justifyContent: 'right' }}>
          <Button variant="text" style={{ color:"#147A12" }}>Copiar Link</Button>
          <Button variant="contained" style={{ backgroundColor:"#147A12" }}>Ver Mais</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}