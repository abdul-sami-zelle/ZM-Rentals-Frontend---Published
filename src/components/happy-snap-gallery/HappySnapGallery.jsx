'use client'

import React from 'react'
import './HappySnapGallery.css';
import mainLogo from '../../assets/logo.png';
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';
import discountBannerImage from '../../assets/home/Beyond_Rentals_image_1.jpg'
import { useRouter } from 'next/navigation';


const HappySnapGallery = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/about-us')
    }
    return (
        <>
            <div className='happy-snap-mobile-main-container'>
                <div className='happy-snap-mobile-single-image-container'>
                    <Image src={'/assets/home/Beyond_Rentals_image_1.jpg'} fill alt='happy snap' className='happy-snap-single-image' />
                </div>

                <div className='happy-snap-description-main-container'>
                    <Image src={'/assets/logos/ZM-Rentals-Horizontal-logo.png'} width={200} height={50} alt='logo' className='happy-snap-logo' />
                    <h3 className='section-main-heading'>Beyond Rentals: Comprehensive On-Road Support</h3>
                    <p>
                        We are more than just a reliable car rental service in Auckland, we’re your partner throughout your adventures and exploration.
                        Our commitment to customer satisfaction extends far beyond handing over the keys and having them returned. We are committed to
                        supporting you every step of the way, addressing any rental-related concerns and needs quickly and efficiently. With our 24/7
                        roadside assistance, you can drive with peace, knowing that help is always just a text or call away, no matter where you are or when you need it.
                        With our comprehensive Auckland car rental services, we ensure you drive confidently during your journey.
                    </p>

                    <SecondaryButton
                        handleSecondaryButtonClick={handleNavigate}
                        secondaryButtonClass={'secondary-prop-class'}
                        width={'157px'}
                        height={'44px'}
                        secondaryBgColor={'transparent'}
                        secondaryBorder={'2px solid var(--primary-color !important)'}
                        textColor={'var(--primary-color)'}
                        fontSize={'var(--font-body-lg)'}
                        lineHeight={'var(--line-height-body)'}
                        fontWeight={'var(--font-weight-body)'}
                        secondaryText={'Find Out More'}
                    />
                </div>

                <div className='happy-snap-gallery-container'>
                    <div className='mobile-happy-snap-gallery-image'>
                        <Image src={'/assets/home/Beyond_Rentals_image_2.jpg'} fill alt='snap two' className='mobile-happy-snap-gallery-image-one' />
                    </div>
                    <div className='mobile-happy-snap-gallery-image'>
                        <Image src={'/assets/home/Beyond_Rentals_image_3.jpg'} fill alt='snap Three' className='mobile-happy-snap-gallery-image-two' />
                    </div>
                </div>
            </div>

            <div className='happy-snap-desktop-main-container'>
                <div className='happy-snap-desktop-gallery-main-container'>
                    <div className='happy-snap-desktop-single-image-container'>
                        <Image src={'/assets/home/Beyond_Rentals_image_1.jpg'} fill alt='snap one' className='desktop-snap-gallery-main-image' />
                    </div>
                    <div className='happy-snap-desktop-multi-images-container'>
                        <div className='desktop-snap-dual-images'>
                            <Image src={'/assets/home/Beyond_Rentals_image_2.jpg'} fill alt='snap two' className='desktop-snap-gallery-image-one' />
                        </div>
                        <div className='desktop-snap-dual-images'>
                            <Image src={'/assets/home/Beyond_Rentals_image_3.jpg'} fill alt='snap two' className='desktop-snap-gallery-image-two' />
                        </div>
                    </div>
                </div>
                <div className='happy-snap-desktop-description-container'>

                    <Image src={'/assets/logos/ZM-Rentals-Horizontal-logo.png'} alt='desktop logo' height={50} width={200} className='happy-snap-desktop-logo' />
                    <h3>Beyond Rentals: Comprehensive On-Road Support</h3>
                    <p>
                        We are more than just a reliable car rental service in Auckland, we’re your partner throughout your adventures and exploration.
                        Our commitment to customer satisfaction extends far beyond handing over the keys and having them returned. We are committed to supporting
                        you every step of the way, addressing any rental-related concerns and needs quickly and efficiently. With our 24/7 roadside assistance,
                        you can drive with peace, knowing that help is always just a text or call away, no matter where you are or when you need it. With our
                        comprehensive Auckland car rental services, we ensure you drive confidently during your journey.
                    </p>
                    <SecondaryButton
                        handleSecondaryButtonClick={handleNavigate}
                        secondaryButtonClass={'secondary-prop-class'}
                        width={'157px'}
                        height={'44px'}
                        secondaryBgColor={'transparent'}
                        secondaryBorder={'2px solid var(--primary-color)'}
                        textColor={'var(--primary-color)'}
                        fontSize={'var(--font-body-lg)'}
                        lineHeight={'var(--line-height-body)'}
                        fontWeight={'var(--font-weight-body)'}
                        secondaryText={'Find Out More'}
                    />
                </div>
            </div>
        </>
    )
}

export default HappySnapGallery