import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { createInfo, reset } from '../features/Info/infoSlice';
import Spinner from '../components/Spinner';
import { FormControl, FormHelperText} from '@mui/material';

const Application = () => {
    const { info, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.info
      )
        // console.log('first info', info)
        let initialState = {
            name: '',
            phone: '',
            email: '',
            income: 0,
            credit_score: 0,
            amount: 0,
            term: 0,
            reason: '',
          }
        const [formData, setFormData] = useState(initialState)

        // const [buttonEnabled, setButtonEnabled ] = useState(true)

        // const [isComplete, setIsComplete] = useState(disabled)
      
        const { name, phone, email, income, credit_score, amount, term, reason } = formData
      
        const navigate = useNavigate()
        const dispatch = useDispatch()
        
        let buttonEnabled = true
        
            if (!name || !email || !phone || !amount || !credit_score || !income || !term || !reason) {
                // setButtonEnabled(false)
                buttonEnabled = false
            }
        
        
        
            const myButton = buttonEnabled ? 
            <Button sx={{bgcolor:'#FF225E', mb:10}} variant="contained" type='submit'>
            next
          </Button> :
          <Button variant="contained" sx={{mb:10}} disabled type='submit'>
          next
        </Button>
          
      
        useEffect(() => {
          if (isError) {
            toast.error(message)
            console.log(message)
          }
      
          if (isSuccess) {
            toast.success('Applicant has been added')
          }
        dispatch(reset())

        }, [info, isError, isSuccess, message, navigate, dispatch])
      
        const onChange = (e) => {
          if(e.target.value){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
          }
          else{
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.defaultValue,
              }))
          }
        }
        let helperText 
        const onSubmit = (e) => {
          e.preventDefault()
      
          if (!name || !email || !phone || !amount || !income || !term || !credit_score || !reason) {
            toast.error('Please enter all the required information')
        if(!name){ helperText = 'Enter correct informaton'}
          } else {
            const userData = {
              name, 
              phone, 
              email, 
              income, 
              credit_score, 
              amount, 
              term,
              reason,
            }
      
            dispatch(createInfo(userData))
          }
        }
      
        if (isLoading) {
          return <Spinner />
        }
    
  return (
    <div style={{maxWidth: 600, margin: 'auto', marginBottom: 50}}>
    <Typography sx={{mt:2, p:2, fontSize:14, textAlign:'center'}} variant="h6" color='#FF225E'>
        APPLICANT'S INFORMATION
    </Typography>
    <form style={{'padding':'0 40px'}} onSubmit={onSubmit}>
    <Stack direction="column" spacing={2}>
      <TextField id="outlined-basic" name='name'  label="Name" variant="outlined" onChange={onChange}/>
      <TextField id="outlined-basic" label="Contact Number" variant="outlined" name='phone' onChange={onChange}/>
      <TextField id="outlined-basic" label="Email" variant="outlined" name='email' onChange={onChange}/>
      <TextField id="outlined-basic" label="Income" variant="outlined" name='income' onChange={onChange}/>
      <TextField id="outlined-basic" label="Credit Score" variant="outlined" name='credit_score' onChange={onChange}/>
      <TextField id="outlined-basic" label="Amount" variant="outlined" name='amount' onChange={onChange}/>
      <TextField id="outlined-basic" label="Term" variant="outlined" name='term' onChange={onChange}/>
      <TextField id="outlined-basic" label="Reason" variant="outlined" name='reason' onChange={onChange}/>
      {myButton}
      
    </Stack>
    </form>
    </div>
  )
}

export default Application