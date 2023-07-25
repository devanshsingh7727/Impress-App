import React from 'react';

function InfoCard({ setactiveStep }) {
  return (
    <div>
      <div class='card'>
        <h2>About ImpressApp</h2>
        <p style={{ margin: '10px' }}>
          ImpressApp is your ultimate app for crafting professional emails
          effortlessly. Generate personalized emails using your resume data and
          choose from a variety of pre-designed company email templates.
          Communicate with confidence and make a lasting impression in just a
          few clicks. Simple, efficient, and effective - that's ImpressApp. Get
          started today and take your email game to the next level!
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            setactiveStep(1);
          }}
          style={{ margin: '30px' }}
          class='buttonMainContinue'
        >
          Continue!
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
