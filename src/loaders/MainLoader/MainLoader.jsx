import React from 'react';
import './MainLoader.css';
// import wheel from "/assets/wheel2.svg"; // Ensure the file exists

const MainLoader = () => {

  return (
    <div className='main-loader-container'>
      <div className="loader-container">
        <div className="glow-ring"></div>
        <div className="steering-wheel-wrapper">
          <img src={'/assets/wheel2.svg'} alt='steering-wheel' className="steering-wheel" />
        </div>
      </div>
      <h3>Please Wait...</h3>
    </div>
  );
};

export default MainLoader;
