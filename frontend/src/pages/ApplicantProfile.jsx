import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getInfo } from '../features/getApplicants/getApplicantsSlice'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import ApplicantCardProfile from '../components/ApplicantCardProfile'
import {Stack} from '@mui/material'

const ApplicantProfile = () => {

    const { key } = useParams()
    const API_URL = `/api/applicants/${key}`
    const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.auth.user.token)
//   console.log('token', token)

    useEffect(() => {
    (async () => {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const response = await axios.get(
          API_URL,
          config
        );

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, [token, API_URL]);

    if(error){
        console.log(error)
    }

    if(!loaded){
        <Spinner/>
    }

    let profile
    if(loaded){
        console.log('applicant:', data)
        profile = <ApplicantCardProfile info={data} id={key}/>
    }

  return (
    <Stack margin='auto' direction='column' alignItems='center' mt={5}>
        {profile}
    </Stack>
    
  )
}

export default ApplicantProfile