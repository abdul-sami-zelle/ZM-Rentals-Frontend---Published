import React from 'react'
import './CancelationPolicyDetails.css'
import Image from 'next/image'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const CancelationPolicyDetails = ({flexDirection, serviceImage, serviceHeading, desc, points}) => {
    
  return (
    <div 
        className='service-detail-main-container'
        style={{flexDirection: flexDirection}}
    >
        <div className='service-detail-image-container'>
            <Image src={serviceImage} alt='service image' width={590} height={393} className='service-image' />
        </div>
        <div className='service-detail-description-container'>
            <div className='service-heading-contaienr'>
                <h3 className='section-main-heading'>{serviceHeading}</h3>
                
            </div>
            <p className='global-content-style' style={{textAlign: 'start'}}>{desc}</p>
            <div className='cancelation-booking-policies-points-container'>
                {points.map((item, index) => (
                    <div className='services-detail-single-point' key={index}> 
                        <MdKeyboardDoubleArrowRight className='points-arrow' color='var(--secondary-color)' /> 
                        <p className='global-content-style' style={{textAlign: 'start'}}> {item.title} </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CancelationPolicyDetails