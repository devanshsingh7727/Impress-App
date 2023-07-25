import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function CompanyInfoMain({ setactiveStep, GeneratedEmail, CreateEmail }) {
  return (
    <div class='form-container'>
      <form class='form'>
        <ArrowBackIcon
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          onClick={() => setactiveStep(0)}
        />

        <div class='form-group'>
          <label for='GeneratedEmail'>Generated Email</label>
          <textarea
            name='GeneratedEmail'
            id='GeneratedEmail'
            rows='10'
            cols='10'
            required=''
            value={GeneratedEmail}
          >
            {' '}
          </textarea>
        </div>
        <div class='formButtons'>
          <button
            class='form-submit-btn'
            onClick={(e) => {
              e.preventDefault();
              //   SubmitCompanydata();
              CreateEmail();
            }}
          >
            Copy
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfoMain;
