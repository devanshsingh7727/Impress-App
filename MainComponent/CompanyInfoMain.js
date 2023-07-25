import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function CompanyInfoMain({
  CompanyData,
  handelChange,
  ClearCompanyInfo,
  setactiveStep,
  SubmitCompanydata,
}) {
  return (
    <div class='form-container'>
      <form class='form'>
        <ArrowBackIcon
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          onClick={() => setactiveStep(0)}
        />
        <div class='form-group'>
          <label for='recruiter_name'>Recruiter's name</label>
          <input
            onChange={handelChange}
            type='text'
            id='recruiter_name'
            name='recruiter_name'
            value={CompanyData.recruiter_name}
            required=''
          />
        </div>
        <div class='form-group'>
          <label for='position'>Position Applying for</label>
          <input
            onChange={handelChange}
            type='text'
            id='position'
            name='position'
            required=''
            value={CompanyData.position}
          />
        </div>{' '}
        <div class='form-group'>
          <label for='company_name'>Company Name</label>
          <input
            onChange={handelChange}
            type='text'
            id='company_name'
            name='company_name'
            required=''
            value={CompanyData.company_name}
          />
        </div>{' '}
        <div class='form-group'>
          <label for='company_description'>Company Description</label>
          <textarea
            onChange={handelChange}
            name='company_description'
            id='company_description'
            rows='10'
            cols='50'
            required=''
            value={CompanyData.company_description}
          >
            {' '}
          </textarea>
        </div>
        <div class='formButtons'>
          <button
            class='form-submit-btn'
            onClick={(e) => {
              e.preventDefault();
              SubmitCompanydata();
            }}
          >
            Submit
          </button>
          <button
            class='form-submit-btn'
            onClick={(e) => {
              e.preventDefault();
              ClearCompanyInfo();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfoMain;
