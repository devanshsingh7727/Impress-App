import { Button, Card, CardContent, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import DesktopStepper from './DesktopStepper';
import MobileStepper from './MobileStepper';
function container() {
  const [MainDescription, setMainDescription] = useState('');
  const [CompanyData, setCompanyData] = useState({
    recruiter_name: '',
    // recruiter_email: '',
    // your_email: '',
    position: '',
    company_name: '',
    company_description: '',
  });

  const [userInfo, setuserInfo] = useState({
    fullname: '',
    // currentPosition: '',
    year: '',
    technologies: '',
  });
  const [companyInfo, setCompanyInfo] = useState([{ name: '', position: '' }]);

  const handelChangeuserInfo = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(value);
    setuserInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: '', position: '' }]);

  //👇🏻 removes a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);

    setCompanyInfo(list);
  };
  //👇🏻 updates an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };
  const remainderText = () => {
    let stringText = '';
    for (let i = 0; i < companyInfo.length; i++) {
      stringText += ` ${companyInfo[i].name} as a ${companyInfo[i].position}.`;
    }
    return stringText;
  };
  const GenerateGpt = async () => {
    let initalData = { ...CompanyData, ...userInfo };
    initalData.remainderText = remainderText();

    let prompt = `My name is ${initalData.fullname}. I want to work for ${initalData.company_name}, they are ${initalData.company_description}
        I am applying for the job ${initalData.position}. I have been working before for: ${initalData.remainderText}
        And I have used the technologies such as ${initalData.technologies} with total experience of ${initalData.year}
        I want to cold email ${initalData.recruiter_name} my resume and write why I fit for the company.
        Can you please write me the email in a friendly voice, not offical? without subject, maximum 300 words and say in the end that my CV is attached.`;

    const response = await fetch(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify({
          prompt: prompt,
          temperature: 0.6,
          max_tokens: 350,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1,
        }),
      }
    );
    const data = await response.json();
    setMainDescription(data.choices[0].text);
  };
  return (
    <Card>
      <CardContent>
        {MainDescription ? (
          <>
            <Button
              onClick={() =>
                navigator.clipboard.writeText('Copy this text to clipboard')
              }
            >
              Copy
            </Button>
            <Button onClick={() => setMainDescription('')}>reset</Button>
            <p>{MainDescription}</p>
          </>
        ) : matches ? (
          <DesktopStepper
            CompanyData={CompanyData}
            handelChange={handelChange}
            companyInfo={companyInfo}
            handleAddCompany={handleAddCompany}
            handleRemoveCompany={handleRemoveCompany}
            handleUpdateCompany={handleUpdateCompany}
            userInfo={userInfo}
            handelChangeuserInfo={handelChangeuserInfo}
            GenerateGpt={GenerateGpt}
          />
        ) : (
          <MobileStepper
            CompanyData={CompanyData}
            handelChange={handelChange}
            companyInfo={companyInfo}
            handleAddCompany={handleAddCompany}
            handleRemoveCompany={handleRemoveCompany}
            handleUpdateCompany={handleUpdateCompany}
            userInfo={userInfo}
            handelChangeuserInfo={handelChangeuserInfo}
            GenerateGpt={GenerateGpt}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default container;
