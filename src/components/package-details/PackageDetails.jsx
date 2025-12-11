'use client'

import React from 'react'
import './PackageDetails.css'
import packageImage from '../../assets/images/mix/carbonClick-home.jpg'
import Image from 'next/image'
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton'
import { useRouter } from 'next/navigation'

const PackageDetails = ({ data, navigateUrl = '/', sectionImage, packageHeading, flexDirection, buttonText, display , objectFit}) => {
    
  const router = useRouter()
  const handleNavigate = () => {
    router.push(navigateUrl)
  }

  return (
    <div className='package-details-main-container' style={{flexDirection: flexDirection}}>
        <div className='package-image-container'>
            <Image src={sectionImage} fill alt='package-image' className='package-image' />
        </div>
        <div className='package-detail-description-container'>
              <h3 className='section-main-heading'>{packageHeading}</h3>
              {data.map((item, index) => (
                <p key={index} className={index === 0 ? 'mobile-package-description-one' : 'mobile-package-description-after-first'}>{item}</p>
              ))}
              <SecondaryButton
                  handleSecondaryButtonClick={handleNavigate}
                  secondaryButtonClass={'secondary-prop-class'}
                  width={'157px'}
                  height={'44px'}
                  secondaryBgColor={'#fff'}
                  secondaryBorder={'2px solid var(--primary-color)'}
                  textColor={'var(--primary-color)'}
                  fontSize={'var(--font-body-lg)'}
                  lineHeight={'var(--line-height-body)'}
                  fontWeight={'var(--font-weight-bold)'}
                  secondaryText={buttonText}
                  display={display}
              />
        </div>
    </div>
  )
}

export default PackageDetails