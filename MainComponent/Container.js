import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import CompanyInfoMain from './CompanyInfoMain';
import InfoCard from './InfoCard';
import ResumeUpload from './ResumeUpload';
import axiosConnection from './axioshelper';
import LoadingScreen from './LoadingScreen';
import OutputPage from './OutputPage';
import Swal from 'sweetalert2';
import { Configuration, OpenAIApi } from 'openai';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Container() {
  const [activeStep, setactiveStep] = useState(0);
  const [resumeData, setresumeData] = useState('');
  const [GeneratedEmail, setGeneratedEmail] = useState({
    subject: '',
    content: '',
  });

  const [CompanyData, setCompanyData] = useState({
    recruiter_name: '',
    recruiter_email: '',

    position: '',
    company_name: '',
    company_description: '',
  });
  const ClearCompanyInfo = () => {
    setCompanyData({
      recruiter_name: '',
      recruiter_email: '',

      position: '',
      company_name: '',
      company_description: '',
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };
  const SubmitCompanydata = () => {
    if (
      CompanyData?.recruiter_name &&
      CompanyData?.recruiter_email &&
      CompanyData?.company_name &&
      CompanyData?.position &&
      CompanyData?.company_description
    ) {
      setactiveStep(2);
    } else {
      handleClick();
    }
  };
  let vertical = 'bottom';
  let horizontal = 'right';

  const handleFileChange = async (event) => {
    setactiveStep(3);

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const { data } = await axiosConnection.post('/pdfManager', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        axiosConnection.defaults.maxContentLength = 100000000;
        axiosConnection.defaults.maxBodyLength = 100000000;
        let Text =
          data.test?.length >= 2000 ? data.test.slice(0, 2000) : data.test;
        let Maindata = JSON.stringify(Text);

        let prompt = `Compose a professional email using the provided resume data to apply for the position at ${CompanyData.company_name}. The company requires candidates with the following skills: ${CompanyData.company_description}. I am interested in the ${CompanyData.position} position, and I noticed that the recruiter handling this role is ${CompanyData.recruiter_name}. Please use the candidate's information enclosed within '''${Maindata}''' to craft the email.
        also create a json format which have keys-> 1) subject 2)content, output the json only which is parsed by JSON.parse.
        `;
        const configuration = new Configuration({
          apiKey: process.env.APIKEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          max_tokens: 1000,

          messages: [
            {
              role: 'system',
              content: `you are the ai assitant which help the user generating the email of 300 words in profesional tone`,
            },
            {
              role: 'assistant',
              content: `
              {
                subject:'',
                content:''
              }
              `,
            },
            {
              role: 'assistant',
              content: prompt,
            },
          ],
          temperature: 0,
        });

        setGeneratedEmail(JSON.parse(response.data.choices[0].message.content));
        setactiveStep(4);
      } catch (err) {
        setactiveStep(0);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err,
        });
        console.log(err);
      }
    }
  };
  const CreateEmail = () => {
    const recipient = CompanyData?.recruiter_email;
    const subject = GeneratedEmail.subject;
    const content = GeneratedEmail.content || ''; // If content prop is not provided, use an empty string

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(content)}`;
    window.location.href = mailtoLink;
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={'bottom' + 'right'}
      >
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          Please fill all values!
        </Alert>
      </Snackbar>
      {activeStep == 0 ? (
        <InfoCard setactiveStep={setactiveStep} />
      ) : activeStep == 1 ? (
        <CompanyInfoMain
          ClearCompanyInfo={ClearCompanyInfo}
          handelChange={handelChange}
          CompanyData={CompanyData}
          setactiveStep={setactiveStep}
          SubmitCompanydata={SubmitCompanydata}
        />
      ) : activeStep == 2 ? (
        <ResumeUpload
          activeStep={activeStep}
          setactiveStep={setactiveStep}
          resumeData={resumeData}
          setresumeData={setresumeData}
          sendRequestPDFManager={handleFileChange}
        />
      ) : activeStep == 3 ? (
        <LoadingScreen setactiveStep={setactiveStep} />
      ) : activeStep == 4 ? (
        <OutputPage
          GeneratedEmail={GeneratedEmail}
          setactiveStep={setactiveStep}
          CreateEmail={CreateEmail}
        />
      ) : (
        'dfd'
      )}
    </div>
  );
}

export default Container;
