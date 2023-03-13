import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CompanyInfo from './companyInfo';
const steps = ['Personal Info', 'Company Info'];
import ResumeInfo from './ResumeInfo';
import { Card } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
export default function HorizontalLinearStepper({
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      GenerateGpt();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ p: 1 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 1 ? (
              <CompanyInfo
                CompanyData={CompanyData}
                handelChange={handelChange}
                ClearCompanyInfo={ClearCompanyInfo}
              />
            ) : (
              <ResumeInfo
                companyInfo={companyInfo}
                handleAddCompany={handleAddCompany}
                handleRemoveCompany={handleRemoveCompany}
                handleUpdateCompany={handleUpdateCompany}
                userInfo={userInfo}
                handelChangeuserInfo={handelChangeuserInfo}
                ClearPersonalInfo={ClearPersonalInfo}
              />
            )}
          </Typography>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <Button
              variant='contained'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              <KeyboardArrowLeft />
              Back
            </Button>

            <Button onClick={handleNext} variant='contained'>
              {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
              <KeyboardArrowRight />
            </Button>
          </Card>
        </React.Fragment>
      )}
    </Box>
  );
}
