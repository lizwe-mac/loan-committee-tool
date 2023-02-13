import React from 'react'
import { useEffect } from 'react'
import { getInfo } from '../features/getApplicants/getApplicantsSlice'
import { useSelector, useDispatch } from 'react-redux'
import ApplicantCard from '../components/ApplicantCard'
import { Stack, Typography } from '@mui/material'
import Spinner from '../components/Spinner'

const ShowApplicants = () => {
    const {applicants, isLoading, isError, isSuccess, message} = useSelector(state => state.applicants) //get state from redux-store
    // console.log('applicants:', applicants[0].customer)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(isError) console.log('ErrorMessage:', message)
        dispatch(getInfo()) //initiate get request for Applicants' data
    }, [dispatch, message, isError])

    if(isLoading){
        return <Spinner/>
    }
    let showApplicants
    if(isSuccess){
        
    showApplicants = applicants.map(applicant => <ApplicantCard name={applicant.customer.name} email={applicant.customer.email} phone={applicant.customer.phone} id={applicant._id} key={applicant._id}/>)
    }

  return (
    <Stack direction='column' alignItems='center' maxWidth={600} margin='auto' gap={2}>
        <Typography variant="h3" color="text.secondary">Applicants</Typography>
        {applicants && showApplicants}
    </Stack>
  )
}

export default ShowApplicants