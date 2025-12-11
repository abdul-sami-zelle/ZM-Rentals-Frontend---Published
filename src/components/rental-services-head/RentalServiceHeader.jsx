import React from 'react'
import './RentalServiceHeader.css';

const RentalServiceHeader = ({heading, description}) => {
  return (
    <div className='rental-service-head-container'>
        <h3 className='section-main-heading'>{heading}</h3>
        <p>{description}</p>
    </div>
  )
}

export default RentalServiceHeader