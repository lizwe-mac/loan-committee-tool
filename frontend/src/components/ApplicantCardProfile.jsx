import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MultiActionAreaCard(props) {
    
    const [openDialog, setDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
      rating: '',
      notes: '',
    })

    const { rating, notes } = formData

    const { info, id } = props

    const handleCancel = () => {
      setDialogOpen(false);
    };

    const handleOpen = () => {
      setDialogOpen(true)
    }


    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const user = useSelector(state => state.auth.user.name)
    const token = useSelector(state => state.auth.user.token)
    const API_URL = `/api/applicants/${id}`
    let config

    const handleSubmit = async (e) => {
      e.preventDefault()
      const userData = {
        rating,
        notes,
      }
      config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, {...userData, name:user}, config);

      console.log('Usedata', {...userData, name:user, key:id})
  
      
    }

    function truncateString(str, character) {
      var index = str.indexOf(character);
      if (index === -1) {
        return str;
      }
      return str.substring(0, index);
    }

  return (
    <>
    <Card sx={{ maxWidth: 600, width:600 }}>
      <CardActionArea>
        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'left'}}>
          <Typography textAlign='left' variant="h5" color="text.secondary">Customer Profile</Typography>
          <Typography mt={2} textAlign='left' variant="h6" color="text.secondary">Name: {info.customer.name}</Typography>
          <Typography textAlign='left' variant="h6" color="text.secondary">Email: {info.customer.email}</Typography>
          <Typography textAlign='left' variant="h6" color="text.secondary">Phone: {info.customer.phone}</Typography>
          <Typography textAlign='left' variant="h6" color="text.secondary">Income: R{info.customer.income}</Typography>
          <Typography mb={1} textAlign='left' variant="h6" color="text.secondary">Credit Acore: {info.customer.credit_score}</Typography>
          <Divider />
          <Typography mt={1} textAlign='left' variant="h6" color="text.secondary">Loan Amount: {info.amount}</Typography>
          <Typography textAlign='left' variant="h6" color="text.secondary">Loan Term: {info.term}</Typography>
          <Typography mb={1} textAlign='left' variant="h6" color="text.secondary">Date of Application: {truncateString(info.applied_at, 'T')}</Typography>
          <Divider />
          <Typography mt={1} textAlign='left' variant="h6" color="text.secondary">Reason:</Typography>
          <Typography textAlign='left' variant="h6" color="text.secondary">{info.reason}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='contained' onClick={handleOpen} color="primary">
          vote
        </Button>
      </CardActions>
    </Card>
    <Dialog
        open={openDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Review and rate the applicant"}
        </DialogTitle>
        <DialogContent>
          
          <Stack >
          <Typography>
          Rating:
          </Typography>
          <RadioGroup
        row
        aria-labelledby="rating"
        name="rating"
        onChange={onChange}
      >
        <FormControlLabel value={1} control={<Radio />} label="1" />
        <FormControlLabel value={2} control={<Radio />} label="2" />
        <FormControlLabel value={3} control={<Radio />} label="3" />
        <FormControlLabel value={4} control={<Radio />} label="4" />
        <FormControlLabel value={5} control={<Radio />} label="5" />
     </RadioGroup>
     <Typography mb={1}>
          Notes:
          </Typography>
     <TextField
                 id="outlined-basic" 
                 label="Write a review" 
                 variant="outlined" 
                 type='text'
                 name='notes'
                 onChange={onChange}
                 required/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCancel}>cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}