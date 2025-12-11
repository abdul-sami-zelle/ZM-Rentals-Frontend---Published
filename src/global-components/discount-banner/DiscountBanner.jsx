'use client'

import React, { useState } from 'react'
import './DiscountBanner.css';
import Image from 'next/image';
import SecondaryButton from '../secondary-button/SecondaryButton';
import SubscriptionModal from '../../modals/SubscriptionModal/SubscriptionModal'

const DiscountBanner = ({ discountImage , marginBottom}) => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const handleSubscribeModal = () => {
    setShowSubscribeModal(true)
  }
  return (
    <div className='discount-banner-main-container' style={{marginBottom: marginBottom}}>
      <div className='discount-banner-inner-container'>

        <div className='discount-banner-image-container'>
          <Image src={'/assets/home/home_get_exclusive_image.jpg'} width={1599} height={130}  alt='discount image' className='discount-banner-image' />
        </div>

        <div className='discount-banner-details-and-subscribe-button-container'>
          <h3 className='discount-banner-heading-content'>Get Exclusive Deals For Your Next Adventure</h3>
          <span className='discount-banner-slogan-and-button'>
            <p className='discount-banner-slogan'>Join our ZM newsletter for exclusive deals, travel tips and inspirations</p>
            <SecondaryButton
            handleSecondaryButtonClick={handleSubscribeModal}
              secondaryButtonClass={'secondary-prop-class'}
              width={'157px'}
              height={'44px'}
              secondaryBgColor={'transparent'}
              secondaryBorder={'2px solid var(--color-white)'}
              textColor={'var(--color-white)'}
              fontSize={'var(--font-body-lg)'}
              lineHeight={'var(--line-height-body)'}
              fontWeight={'var(--font-weight-body)'}
              secondaryText={'Subscribe'}
            />
          </span>
        </div>
      </div>

      <SubscriptionModal 
        showSubscription={showSubscribeModal}
        setShowSubscription={setShowSubscribeModal}
        imgUrl={'/assets/home/home_get_exclusive_image.jpg'}
      />
    </div>
  )
}

export default DiscountBanner