import React from 'react'
import './ServiceDetail.css';
import Image from 'next/image';


const ServiceDetail = ({flexDirection, serviceImage, serviceHeading, serviceDescription}) => {
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
                <h3 className='global-heading-style'>{serviceHeading}</h3>
                {/* <div className='service-heading-underline-main-container'>
                    <div className='service-heading-top-line-container'>
                        <div className='service-heading-right-side-line'></div>
                    </div>
                    <div className='service-heading-bottom-line'>
                        <div className='service-heading-left-line'></div>
                    </div>
                </div> */}
            </div>
            <p className='global-content-style'>{serviceDescription}</p>
        </div>
    </div>
  )
}

export default ServiceDetail