'use client'
import React, { useEffect, useState } from 'react'
import './ManageBooking.css'
import SelectBooking from '../../components/manage-bookings-components/SelectBooking/SelectBooking'
import VerifyBooking from '../../components/manage-bookings-components/VerifyBooking/VerifyBooking'
import UpdateBooking from '../../components/manage-bookings-components/UpdateBooking/UpdateBooking'
import { IoIosArrowRoundBack } from "react-icons/io";
import UpdateBookingMobile from '../../components/manage-bookings-components/UpdateBookingMobile/UpdateBookingMobile'
import axios from 'axios'

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

const page = () => {
    const isMobile = useIsMobile();
    const [manageBookingSteper, setManageBookingSteper] = useState(0);

    const images = [
        "/assets/manage-bookings/blur-bg.jpg",
        "/assets/manage-bookings/big-extra-image.jpg",
        "/assets/manage-bookings/big-image-1.jpg",
        "/assets/manage-bookings/big-image-2.jpg",
        "/assets/manage-bookings/big-image-3.jpg",
        "/assets/manage-bookings/big-image-4.jpg",
    ];
    const posterImages = [
        "/assets/manage-bookings/inner-poster-1.jpg",
        "/assets/manage-bookings/inner-poster-2.jpg",
        "/assets/manage-bookings/inner-poster-3.jpg",
        "/assets/manage-bookings/inner-poster-4.jpg",
        "/assets/manage-bookings/inner-poster-5.jpg",
    ];

    const [bgImage, setBgImage] = useState(images[0]);
    const [posterBg, setPosterBg] = useState(posterImages[0]);

    const changeBackground = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const posterINdex = Math.floor(Math.random() * posterImages.length)
        setBgImage(images[randomIndex]);
        setPosterBg(posterImages[posterINdex])
    };

    return (
        <div
            className='manage-booking-main-contianer'
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {manageBookingSteper < 1 ? (
                <div className='manage-booking-inner-contianer'>
                    <div
                        className='manage-booking-left-sec'
                        style={{
                            backgroundImage: `url(${posterBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                    </div>

                    <div className='manage-booking-right-sec'>
                        <div className='manage-booking-form-arrow-back-contianer'>
                            <IoIosArrowRoundBack size={35} color='#000' style={{ cursor: 'pointer' }} />
                        </div>

                        <div className='manage-booking-right-content-scroll-contianer'>
                            {manageBookingSteper === 0 ? <SelectBooking imageChaneg={changeBackground} manageBookingSteper={manageBookingSteper} setManageBookingSteper={setManageBookingSteper} />
                                : <VerifyBooking imageChange={changeBackground} manageBookingSteper={manageBookingSteper} setManageBookingSteper={setManageBookingSteper} />}
                        </div>

                    </div>
                </div>
            ) : (
                <>
                    {!isMobile && <UpdateBooking setManageBookingSteper={setManageBookingSteper} />}
                    {isMobile && <UpdateBookingMobile />}
                </>

            )}

        </div>
    )
}

export default page