import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import CompanyInfoMain from './CompanyInfoMain';
import InfoCard from './InfoCard';
import ResumeUpload from './ResumeUpload';
import axiosConnection from './axioshelper';
import LoadingScreen from './LoadingScreen';
import OutputPage from './OutputPage';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Container() {
  const [activeStep, setactiveStep] = useState(0);
  const [resumeData, setresumeData] = useState('');
  const [GeneratedEmail, setGeneratedEmail] = useState('');

  const [CompanyData, setCompanyData] = useState({
    recruiter_name: '',
    position: '',
    company_name: '',
    company_description: '',
  });
  const ClearCompanyInfo = () => {
    setCompanyData({
      recruiter_name: '',
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

      const { data } = await axiosConnection.post('/pdfManager', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const MainGpt = await axiosConnection.post('/Chatgpt', {
        text: data.test,
      });
      setGeneratedEmail(MainGpt.data.data);
    }
    setactiveStep(4);
  };
  const CreateEmail = () => {
    const recipient = 'recipient@example.com';
    const subject = 'Hello!';
    const content = 'test' || ''; // If content prop is not provided, use an empty string

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
