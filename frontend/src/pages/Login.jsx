import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import Reaptcha from 'reaptcha';
import { pink, grey, blue } from '@mui/material/colors';
import { GitHub, Twitter } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider, Typography, Stack, TextField, Button } from '@mui/material'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  
  const verify = () =>{
    captchaRef.current.getResponse().then(res => {
        setCaptchaToken(res)
    })
  
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/applicants')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(!captchaToken){
      toast.error('Are you a robot? 🤖')
      return
    }
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  

// const handleClose = () => setOpen(false);

  return (
    <div style={{maxWidth: 600, margin: 'auto'}}>
    {/* <Typography sx={{mt:2, mb:2, p:2, fontSize:32, textAlign:'center', fontFamily:'"Kaushan Script"'}} variant="h6" color='#FF225E'>
      LizweDocs
    </Typography> */}
    {/* <TopNavigation header={{name:'', account:false, arrow:false }}/> */}
    <Typography sx={{mt:2, mb:2, p:2, fontSize:16, textAlign:'center'}} variant="h6" color='#FF225E'>
       LOGIN TO YOUR ACCOUNT
    </Typography>

      <section className='form'>
        <form onSubmit={onSubmit}>
              <Stack spacing={2} direction="column">
                <TextField
                 id="outlined-basic" 
                 label="Email" 
                 variant="outlined" 
                 type='email'
                 placeholder='example@email.com'
                 name='email'
                 value={email}
                 onChange={onChange}
                 required/>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type='password'
                name='password'
                value={password}
                onChange={onChange}
                required/>
                <Reaptcha 
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
                onVerify={verify} 
                />
                <Button type='submit' variant="contained" size="large" sx={{bgcolor:'#FF225E'}}>Login</Button>
      
            </Stack>
        </form>
      </section>
      <Typography sx={{mt:5, p:2, fontSize:16, textAlign:'center'}} variant="h6" color=''>
      Do not yet have an account? Add your account in <Link to="/admin"><span><Typography sx={{fontSize:16}} variant="h6" color='#FF225E'>admin portal</Typography></span></Link>
    </Typography>
    
    </div>
  )
}

export default Login
