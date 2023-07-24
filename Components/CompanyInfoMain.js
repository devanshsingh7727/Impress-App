import React from 'react';

function CompanyInfoMain({ CompanyData, handelChange, ClearCompanyInfo }) {
  return (
    <div class='form-container'>
      <form class='form'>
        <div class='form-group'>
          <label for='recruiter_name'>Recruiter's name</label>
          <input
            onChange={handelChange}
            type='text'
            id='recruiter_name'
            name='recruiter_name'
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
          >
            {' '}
          </textarea>
        </div>
        <div class='formButtons'>
          <button class='form-submit-btn'>Submit</button>
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
