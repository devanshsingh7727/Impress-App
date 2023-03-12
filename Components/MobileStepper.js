import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CompanyInfo from './companyInfo';
import ResumeInfo from './ResumeInfo';
export default function TextMobileStepper({
  CompanyData,
  handelChange,
  companyInfo,
  handleAddCompany,
  handleRemoveCompany,
  handleUpdateCompany,
  userInfo,
  handelChangeuserInfo,
  GenerateGpt,
  ClearPersonalInfo,
  ClearCompanyInfo,
}) {
  const steps = [
    {
      label: 'Personal Info',
      description: (
        <ResumeInfo
          companyInfo={companyInfo}
          handleAddCompany={handleAddCompany}
          handleRemoveCompany={handleRemoveCompany}
          handleUpdateCompany={handleUpdateCompany}
          userInfo={userInfo}
          handelChangeuserInfo={handelChangeuserInfo}
          ClearPersonalInfo={ClearPersonalInfo}
        />
      ),
    },
    {
      label: 'Company Info',
      description: (
        <CompanyInfo
          CompanyData={CompanyData}
          handelChange={handelChange}
          ClearCompanyInfo={ClearCompanyInfo}
        />
      ),
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      GenerateGpt();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div sx={{ width: '100%', flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: '100%', width: '100%', p: 2 }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant='text'
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            // disabled={activeStep === maxSteps - 1}
          >
            {activeStep === maxSteps - 1 ? (
              <>Generate</>
            ) : (
              <>
                Next
                <KeyboardArrowRight />
              </>
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
