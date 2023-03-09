import { TextField, Card, CardContent, Button } from '@mui/material';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import React, { useState } from 'react';

function LandingPage({
  companyInfo,
  handleAddCompany,
  handleRemoveCompany,
  handleUpdateCompany,
  userInfo,
  handelChangeuserInfo,
}) {
  return (
    <Card>
      <CardContent>
        <TextField
          value={userInfo?.fullname}
          onChange={handelChangeuserInfo}
          fullWidth
          style={{ margin: '10px 0px' }}
          variant='outlined'
          label='Enter Full Name'
          name={'fullname'}
        />

        {/* <TextField
          value={userInfo?.currentPosition}
          onChange={handelChangeuserInfo}
          fullWidth
          style={{ margin: '10px 0px' }}
          variant='outlined'
          label='Current Position'
          name='currentPosition'
        /> */}
        <TextField
          value={userInfo?.year}
          onChange={handelChangeuserInfo}
          fullWidth
          style={{ margin: '10px 0px' }}
          type='number'
          variant='outlined'
          name='year'
          label='For how long? (year)'
        />
        <TextField
          value={userInfo?.technologies}
          onChange={handelChangeuserInfo}
          fullWidth
          style={{ margin: '10px 0px' }}
          variant='outlined'
          label='Technologies Used'
          name='technologies'
        />
        {companyInfo.map((company, index) => (
          <Card>
            <TextField
              value={company?.name}
              fullWidth
              style={{ margin: '10px 0px' }}
              name='name'
              onChange={(e) => handleUpdateCompany(e, index)}
              variant='outlined'
              label='Company Name'
            />
            <TextField
              value={company?.position}
              fullWidth
              style={{ margin: '10px 0px' }}
              name='position'
              onChange={(e) => handleUpdateCompany(e, index)}
              variant='outlined'
              label='Position Held'
            />

            <>
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <Button id='addBtn' onClick={handleAddCompany}>
                  Add
                </Button>
              )}
              {companyInfo.length > 1 && (
                <Button
                  id='deleteBtn'
                  onClick={() => handleRemoveCompany(index)}
                >
                  Del
                </Button>
              )}
            </>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default LandingPage;
