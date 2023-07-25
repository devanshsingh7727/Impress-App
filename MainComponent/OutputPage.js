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
          <label for='subject'>Subject</label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={GeneratedEmail?.subject}
            required=''
          />
        </div>
        <div class='form-group'>
          <label for='content'>Content</label>
          <textarea
            name='content'
            id='content'
            rows='10'
            cols='10'
            required=''
            value={GeneratedEmail?.content}
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
            Forward Email!
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfoMain;
