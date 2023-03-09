import { TextField, Card, CardContent, Button } from '@mui/material';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import React, { useState } from 'react';

function LandingPage({ CompanyData, handelChange }) {
  console.log('CompanyData', CompanyData);
  return (
    <Card>
      <CardContent>
        <TextField
          value={CompanyData?.recruiter_name}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          variant='outlined'
          name='recruiter_name'
          label="Recruiter's name"
        />
        <TextField
          value={CompanyData?.recruiter_email}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          variant='outlined'
          name='recruiter_email'
          label="Recruiter's Email"
        />
        <TextField
          value={CompanyData?.your_email}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          variant='outlined'
          name='your_email'
          label='Your Email Address'
        />
        <TextField
          value={CompanyData?.position}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          variant='outlined'
          name='position'
          label='Position Applying for'
        />
        <TextField
          value={CompanyData?.company_name}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          variant='outlined'
          name='company_name'
          label='Company Name'
        />
        <TextField
          value={CompanyData?.company_description}
          fullWidth
          style={{ margin: '10px 0px' }}
          onChange={handelChange}
          label='Company Description'
          variant='outlined'
          name='company_description'
        />
      </CardContent>
    </Card>
  );
}

export default LandingPage;
