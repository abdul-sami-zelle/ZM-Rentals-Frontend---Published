import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'
import BookingForm from '../booking-form/BookingForm'
import { useSearchVehicle } from '../../context/searchVehicleContext/searchVehicleContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Toust from '../../modals/Toust/Toust'
import StickySection from '../../global-components/sticky-section/StickySection'
import { url } from '../../utils/services'


const Hero = ({ bgImage, locationHeading, locationPara, dualHeading = true, marginBottom = '50px', minHeight = 'auto' }) => {
    const { searchVehiclePayload, searchedVehicles, setSearchedVehicles, setLoader, setIsVehicleSearched } = useSearchVehicle()
    const router = useRouter()
    const [toustShow, setTOustShow] = useState(false)
    const [toustMessage, setToustMessage] = useState('')
    const [isPickupSelected, setIsPickupSelected] = useState(false);

    

    const isValidDropDate = (pickup, drop) => {
        if (!pickup || !drop) return false; // both must exist
        return new Date(drop) >= new Date(pickup);
    };

    const handleSearchVehicles = async () => {
        const api = `${url}/cars/available-cars`;
        const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;


        if (isValidDropDate(searchVehiclePayload?.pickup_time, searchVehiclePayload?.drop_time)) {
            try {
                setLoader(true)
                if (pickup_location && drop_location && pickup_time && drop_time) {
                    const response = await axios.post(api, searchVehiclePayload);

                    if (response.status === 200) {
                        setLoader(false)
                        setSearchedVehicles(response.data);
                        setIsVehicleSearched(true)
                        sessionStorage.setItem('pick_and_drop_details', JSON.stringify(searchVehiclePayload));
                        router.push("/vehicles");


                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });

                    } else {
                        setLoader(false)
                        console.warn(`[WARN] Unexpected status code: ${response.status}`);
                        console.error("Unexpected response from server. Please try again later.");

                    }
                } else {
                    setTOustShow(true)
                    setToustMessage("Please Fill All The Fields To Search Vehicle")
                }


            } catch (error) {
                setLoader(false);
                if (error.response) {
                    const status = error.response.status;

                    if (status === 400) {
                        setToustMessage("Please Fill All The Fields To Search Vehicle")("Invalid search request. Please check your input and try again.");
                    } else if (status >= 500) {
                        setToustMessage("Please Fill All The Fields To Search Vehicle")("Server error occurred. Please try again later.");
                    } else {
                        setToustMessage("Please Fill All The Fields To Search Vehicle")("Something went wrong. Please try again.");
                    }

                    console.error(`[ERROR] ${status}:`, error.response.data);

                } else if (error.request) {
                    setToustMessage("Please Fill All The Fields To Search Vehicle")("No response from server. Please check your internet connection.");
                    console.error("[NO RESPONSE] Request was made but no response received.");
                } else {
                    setToustMessage("Please Fill All The Fields To Search Vehicle")("Unexpected error occurred. Please try again.");
                    console.error("[CLIENT ERROR] Something went wrong:", error.message);
                }
            } finally {
                setLoader(false)
            }
        } else {
            setTOustShow(true)
            setToustMessage("Please Select Valid Drop Off Date")
        }


    };



    const [isSticky, setIsSticky] = useState(false);
    const bookingFormRef = useRef(null)
    useEffect(() => {
        if (!bookingFormRef.current) return

        const handleScroll = () => {
            const rect = bookingFormRef?.current?.getBoundingClientRect();
            if (rect.bottom <= 57) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div className='hero-section-main-container' style={{ marginBottom: marginBottom, }}>
            <div
                className='hero-section-inner-container'
                style={{ backgroundImage: `url(${bgImage})`, minHeight: minHeight }}
            >
                <div className='hero-section-content-container'>
                    <div className='hero-section-main-heading-container'>
                        {dualHeading ? (
                            <h3>
                                {/* Celebrating 25 Years of ZM: <br />  WIN Your Share of $25,000!* */}
                                Your Auckland <br /> Adventure Starts Here
                            </h3>
                        ) : (
                            <h3>
                                {/* Celebrating 25 Years of ZM: <br />  WIN Your Share of $25,000!* */}
                                {locationHeading}
                            </h3>
                        )}

                    </div>
                    <div className='hero-section-main-pera-container'>
                        {dualHeading ? (
                            <p>
                                Explore Auckland with sustainable & <br /> reliable car rentals - your perfect ride awaits!
                            </p>
                        ) : (
                            <p>{locationPara}</p>
                        )}

                    </div>
                    <div ref={bookingFormRef} className={`booking-form-container-parent`}>
                        <div className={`booking-form-width-control-container`}>
                            <BookingForm bgColor={'var(--color-white)'} isPickupSelected={isPickupSelected} setIsPickupSelected={setIsPickupSelected} setHeight={true} handleSearchVehicles={handleSearchVehicles} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} textColor={'var(--color-white)'} textShadow={'1px 1px 2px #961502;'} primaryButtonText={'Search Cars'} />
                        </div>
                    </div>
                </div>
            </div>
            <Toust
                showToust={toustShow}
                setShowToust={setTOustShow}
                message={toustMessage}
            />

            <div className={`booking-sticky-form ${isSticky ? 'show-sticky-booking-form' : ''}`}>
                <StickySection bgColor={'var(--color-white)'} isPickupSelected={true} setIsPickupSelected={setIsPickupSelected} setHeight={true} handleSearchVehicles={handleSearchVehicles} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} textColor={'var(--color-white)'} textShadow={'1px 1px 2px #961502;'} primaryButtonText={'Search Cars'} />
            </div>
        </div>
    )
}

export default Hero