import React from 'react';
function MainContainer() {
  return (
    <div class='form-container'>
      <form class='form'>
        <div class='input-div'>
          <input class='input' name='file' type='file' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            stroke-linejoin='round'
            stroke-linecap='round'
            viewBox='0 0 24 24'
            stroke-width='2'
            fill='none'
            stroke='currentColor'
            class='icon'
          >
            <polyline points='16 16 12 12 8 16'></polyline>
            <line y2='21' x2='12' y1='12' x1='12'></line>
            <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3'></path>
            <polyline points='16 16 12 12 8 16'></polyline>
          </svg>
        </div>
        <button
          data-text='Awesome'
          class='button'
          onClick={(e) => e.preventDefault()}
        >
          <span class='actual-text'>&nbsp;Upload Resume!&nbsp;</span>
          <span class='hover-text' aria-hidden='true'>
            &nbsp;Upload Resume!&nbsp;
          </span>
        </button>
      </form>
    </div>
  );
}

export default MainContainer;
