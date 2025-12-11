import React from 'react'
import './LocationDetails.css'
import { TfiLocationPin } from "react-icons/tfi";

const LocationDetails = () => {
    return (
        <>
            <div className='location-details-desktop-main-container'>
                <div className='location-detail-desktop-inner-container'>
                    <div className='location-details-row-container'>
                        <div className='location-detain-desktop-map-section'>
                            <span>
                                <TfiLocationPin size={20} color='#000' />
                                Aukland City
                            </span>
                        </div>
                        <div className='location-details-desktop-details-section'>
                            <h3>New Zealand Car Hire Locations</h3>
                            <p className='location-details-para-one'>At ZM Rentals, we prioritize your convenience, which is why we’ve chosen the perfect location for both travelers and locals. Our South Auckland Car Rental Depot, located in Mangere, is just minutes from the Auckland Airport, making it easy for tourists to pick up their pre-booked car or make a walk-in reservation upon arrival. For locals, our depot is the ideal spot for renting a car, whether it's for occasional use or a long-term car rental in Auckland. With our strategic location, we ensure a smooth, hassle-free experience, whether you’re a visitor or live here and need to rent a car in Auckland.</p>
                            {/* <span>
                                <TfiLocationPin size={20} color='var(--color-white)' />
                                Aukland City
                            </span> */}
                            <div className='city-details-section'>
                                <h3>Auckland City</h3>
                                <div className='city-and-opening-times-contianer'>
                                    {/* <p><strong>Address: </strong> 11 peninsula road Mangere Auckland 2022</p> */}
                                    <p><strong>Address: </strong> Aero Auckland Airport Hotel 190 Kirkbride Road, Māngere, Auckland 2022</p>
                                    <p><strong>Office Hours: </strong> 9:00AM TO 5:00PM</p>
                                    <p><strong>Pick Up & Drop Off : </strong> 6:00AM to 9:00PM</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='city-details-section'>
                        <h3>Auckland City</h3>
                        <div className='city-and-opening-times-contianer'>
                            <p><strong>Address: </strong> 11 peninsula road Mangere Auckland 2022</p>
                            <p><strong>Office open hours: </strong> 08:00 - 17:00, 7 days a week.</p>
                            <p><strong>Pick up & Drop off: </strong> 08:00 - 17:00, 7 days a week.</p>
                            
                        </div>
                    </div> */}
                </div>
            </div>

            <div className='mobile-location-details-main-container'>
                <div className='mobile-location-details-inner-container'>
                    <h3>Prime  Auckland Location for Convenient Car Rentals </h3>
                    <p>At ZM Rentals, we prioritize your convenience, which is why we’ve chosen the perfect location for both travelers and locals. Our South Auckland Car Rental Depot, located in Mangere, is just minutes from the Auckland Airport, making it easy for tourists to pick up their pre-booked car or make a walk-in reservation upon arrival. For locals, our depot is the ideal spot for renting a car, whether it's for occasional use or a long-term car rental in Auckland. With our strategic location, we ensure a smooth, hassle-free experience, whether you’re a visitor or live here and need to rent a car in Auckland.</p>
                    <span>
                        <TfiLocationPin size={20} color='#000' />
                        Aukland City
                    </span>
                </div>
                <div className='mobile-city-details-section'>
                    <h3>Auckland City</h3>
                    <div className='mobile-city-and-opening-times-contianer'>
                        <p><strong>Address: </strong> Aero Auckland Airport Hotel 190 Kirkbride Road, Māngere, Auckland 2022</p>
                        <p><strong>Office Hours: </strong> 9:00AM TO 5:00PM</p>
                        <p><strong>Pick Up & Drop Off : </strong> 6:00AM to 9:00PM</p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LocationDetails