import React from 'react'
import './FeedbackGallery.css';
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';

import imgOne from '../../assets/home/home_pageFlexible_Car_Rental_Services_image_2.jpg'
import { useRouter } from 'next/navigation';

const FeedbackGallery = () => {
    const router = useRouter()
    const handleNavigate = () => {
        router.push('/car-rental-services')
    }
    return (
        <div className='feedback-gallery-main-container'>

            <div className='feedback-gallery-images-container'>
                <div className='feedback-gallery-images-single-image-container'>
                    <Image src={'/assets/home/homeFlexible_Car_Rental_Services_image 1.jpg'} fill alt='home road support' className='feedback-gallery-image' />
                </div>
                <div className='feedback-gallery-images-single-image-container'>
                    <Image src={'/assets/home/home_pageFlexible_Car_Rental_Services_image_2.jpg'} fill alt='home road support' className='feedback-gallery-image-two' />
                </div>
            </div>
            <div className='feedback-gallery-description-container'>
                <h3 className='section-main-heading'>Flexible Car Rental Services in Auckland</h3>
                <p>
                    At ZM Rentals, our top priority is to provide a flexible and enjoyable car rental experience, ensuring your time in Auckland, New Zealand is free of any hassles.
                    With tourism booming in New Zealand, we are committed to enhancing visitors’ experiences by offering the most adaptable car rental services. Whether you’re
                    embarking on an extensive solo adventure, enjoying a week-long family holiday, or here for a quick business trip, we provide full flexibility when it comes
                    to vehicle selection and rental durations. With ZM Rentals, you can count on a smooth and adaptable journey throughout Auckland, making your trip as
                    convenient and enjoyable as possible.
                </p>
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
                    fontWeight={'var(--font-weight-body)'}
                    secondaryText={'See More Details'}
                />
            </div>

            <div className='feedback-gallery-customer-comment-card-main-container'>
                <div className='feedback-gallery-customer-comment-card-inner-container'>
                    <p>
                        ZM Rentals are AWESOME! The car was fantastic, safe and didn’t miss a beat. From the moment we picked up the car
                        the staff were so helpful and gave us lots of local knowledge tips. 10/10 thanks ZM rentals!
                    </p>
                    <div className='feedback-gallery-user-profile-section'>
                        <div className='feedback-gallery-profile-container'>
                            <Image src={'/assets/images/feedback-gallery/Home_Road_Support_1.jpg'} fill alt='home image' className='feedback-gallery-customer-profile' />
                        </div>
                        <span>
                            <h3>Tegan</h3>
                            <p>Australia</p>
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FeedbackGallery