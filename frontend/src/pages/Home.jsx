import image from "../assets/image.jpg"
import { Link } from "react-router-dom"
import { Typography, Button, Stack, Box } from "@mui/material"

function Home() {
  return (
    <Box style={{backgroundImage:`url(${image})`,
    backgroundSize: "cover",
    backgroundPosition:'center',
    height: "100vh",
    width:'100vw',
    display:'flex',
    flexDirection:'column',
    alignItems:'right',
    justifyContent:'center'}}>
    <Stack direction='column' alignItems='right' justifyContent='center' gap={5}>
       <Typography variant="h4">LOAN COMMITTE TOOL</Typography>
        <Link to="/login"><Button variant="contained">GET STARTED</Button></Link>
       
    </Stack>
    </Box>
  )
}

export default Home