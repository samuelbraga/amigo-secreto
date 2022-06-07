import * as React from 'react';

import { Box, Button, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Stack, Typography } from '@mui/material';
import { People, LocalAtm, Edit, EventAvailable, Place } from '@mui/icons-material';

export default function SorteioCard() {
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
              Amigo Secreto - Empresa XPTO
            </Typography>
            <Edit/>
          </Stack>
        </Box>
        
        <List sx={{ width: '100%' }}>
          {renderInfo(<People />,'10')}
          {renderInfo(<LocalAtm />,'R$ 100,00')}
          {renderInfo(<EventAvailable />,'10/06/2022')}
          {renderInfo(<Place />,'Rua Amarelo de Janeiro, 323, Caxias - Rio de Janeiro')}
        </List>

        <Stack spacing={2} direction="row" sx={{ justifyContent: 'right' }}>
          <Button variant="text">Copiar Link</Button>
          <Button variant="contained">Ver Mais</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}