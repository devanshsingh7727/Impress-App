import { TextField, Card, CardContent, Button } from '@mui/material';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import React, { useState } from 'react';

function LandingPage() {
  const [data, setData] = useState({
    recruiter_name: '',
    recruiter_email: '',
    your_email: '',
    position: '',
    company_name: '',
    company_description: '',
  });
  console.log(data);
  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Card>
      <CardContent>
        <TextField
          onChange={handelChange}
          variant='outlined'
          name='recruiter_name'
          label="Recruiter's name"
        />
        <TextField
          onChange={handelChange}
          variant='outlined'
          name='recruiter_email'
          label="Recruiter's Email"
        />
        <TextField
          onChange={handelChange}
          variant='outlined'
          name='your_email'
          label='Your Email Address'
        />
        <TextField
          onChange={handelChange}
          variant='outlined'
          name='position'
          label='Position Applying for'
        />
        <TextField
          onChange={handelChange}
          variant='outlined'
          name='company_name'
          label='Company Name'
        />
        <TextField
          onChange={handelChange}
          label='Company Description'
          variant='outlined'
          name='company_description'
        />

        <Button variant='contained' component='label'>
          Upload File
          <input
            type='file'
            hidden
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = async (e) => {
                const content = e.target.result;
                var doc = new Docxtemplater(new PizZip(content), {
                  delimiters: {
                    start: '12op1j2po1j2poj1po',
                    end: 'op21j4po21jp4oj1op24j',
                  },
                });
                var text = doc.getFullText();
                console.log(text);
              };
              reader.readAsBinaryString(e.target.files[0]);
            }}
          />
        </Button>

        <Button
          onClick={() => {
            fetch('/api/Chatgpt', {
              method: 'GET',
            });
          }}
        >
          Send
        </Button>
      </CardContent>
    </Card>
  );
}

export default LandingPage;
