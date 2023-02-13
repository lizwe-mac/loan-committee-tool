import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 300, mt:20, display:'flex', flexDirection:'column', alignItems:'center', margin:'auto', gap:5}}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  );
}