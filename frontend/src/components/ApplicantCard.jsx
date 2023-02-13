import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MultiActionAreaCard(props) {

    const navigate = useNavigate()

    const { name, email, phone, id } = props
    console.log('key', id)

  return (
    <Card sx={{ maxWidth: 600, width:500 }}>
      <CardActionArea>
        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'left'}}>
          <Typography textAlign='left' variant="h5" color="text.secondary">Name: {name}</Typography>
          <Typography textAlign='left' variant="h5" color="text.secondary">Email: {email}</Typography>
          <Typography textAlign='left' variant="h5" color="text.secondary">Phone: {phone}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => navigate(`/applicants/${id}`)} size="small" color="primary">
          View Full profile
        </Button>
      </CardActions>
    </Card>
  );
}