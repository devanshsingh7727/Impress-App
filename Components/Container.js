import { Card, CardContent, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';
function container() {
  const [CompanyData, setCompanyData] = useState({
    recruiter_name: '',
    recruiter_email: '',
    your_email: '',
    position: '',
    company_name: '',
    company_description: '',
  });
  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Card>
      <CardContent>
        {matches ? (
          <DesktopStepper
            CompanyData={CompanyData}
            handelChange={handelChange}
          />
        ) : (
          <MobileStepper
            CompanyData={CompanyData}
            handelChange={handelChange}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default container;
