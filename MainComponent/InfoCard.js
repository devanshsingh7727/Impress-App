import React from 'react';

function InfoCard() {
  return (
    <div>
      <div class='card'>
        <h2>About</h2>
        <p style={{ margin: '10px' }}>
          ProEmailGen is your ultimate app for crafting professional emails
          effortlessly. Generate personalized emails using your resume data and
          choose from a variety of pre-designed company email templates.
          Communicate with confidence and make a lasting impression in just a
          few clicks. Simple, efficient, and effective - that's ProEmailGen. Get
          started today and take your email game to the next level!
        </p>
        <button
          onClick={(e) => e.preventDefault()}
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
