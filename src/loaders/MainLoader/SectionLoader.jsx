import React from 'react';
import './SectionLoader.css';
import wheel from "../../../Assets/Images/wheel.svg"; // Ensure the file exists
import useLoader from '../../../Services/LoaderHook';

const SectionLoader = () => {
  const { Loader } = useLoader(); // Assuming this hook handles your loading logic

  return (
    <div className='main-loader-container'>
      <div className="loader-container">
        <div className="glow-ring"></div>
        <div className="steering-wheel-wrapper">
          <img src={wheel} alt='steering-wheel' className="steering-wheel" />
        </div>
      </div>
      <h3>Please Wait...</h3>
    </div>
  );
};

export default SectionLoader;
