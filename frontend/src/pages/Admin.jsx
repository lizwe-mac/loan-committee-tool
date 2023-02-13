import { Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import Register from "./Register"
import Application from "./Application"
import { useNavigate } from "react-router-dom"



const Admin = () => {
    const navigate = useNavigate()

    const [accIsopen, setAccIsOpen] = useState(false)
    const [appIsopen, setAppIsOpen] = useState(false)
    const [statsIsopen, setStatsIsOpen] = useState(false)

    const handleAccOpen = () => {
        setAccIsOpen(current => !current)
        setAppIsOpen(false)
        setStatsIsOpen(false)
    }

    const handleAppOpen = () => {
        setAppIsOpen(current => !current)
        setAccIsOpen(false)
        setStatsIsOpen(false)
    }

    const handleStatsOpen = () => {
        setStatsIsOpen(current => !current)
        setAccIsOpen(false)
        setAppIsOpen(false)
    }

  return (
    <>
        <Typography sx={{mt:2, mb:2, p:2, fontSize:24, textAlign:'center'}} variant="h1" color='#FF225E'>
            Admin Portal
        </Typography>
        <Stack maxWidth={600} display='flex' direction='row' justifyContent='space-around' margin='auto'>
            {!accIsopen && <Button onClick={handleAccOpen} variant="outlined">Create Account</Button>}
            {accIsopen && <Button onClick={handleAccOpen} variant="contained">Create Account</Button>}
            {!appIsopen && <Button onClick={handleAppOpen} variant="outlined">Create Applicant</Button>}
            {appIsopen && <Button onClick={handleAppOpen} variant="contained">Create Applicant</Button>}
            {!statsIsopen && <Button onClick={() => handleStatsOpen} variant="outlined">View Stats</Button>}
            {statsIsopen && <Button onClick={() => handleStatsOpen} variant="contained">View Stats</Button>}
        </Stack>
        {accIsopen && <Register/>}
        {appIsopen && <Application/>}
        <Button onClick={() => navigate('/login')} sx={{mt:10, mb:2}} variant="contained">back to login</Button>
    </>
  )
}

export default Admin