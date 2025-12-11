import React from 'react'
import './PopularCars.css';
import Image from 'next/image';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const PopularCars = () => {
    const popularCarsData = [
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
        {name: 'Toyota Yaris', img: `/assets/images/cars/small_cars_menu_Tablet.jpg`},
    ]
  return (
    <div className='popular-cars-main-container'>
        <div className='popular-cars-inner-container'>
            <h3>Popular ZM Rentals cars</h3>
            <p>With over 20 years experience in the New Zealand car hire industry, we pride ourselves on selecting a sleek, modern fleet to give you the best ride. From a sustainable electric fleet to various SUV and family cars, we ensure every vehicle meets strict quality standards.</p>
            <div className='popular-cars-cards-container'>
                {popularCarsData.map((item, index) => (
                    <div key={index} className='popular-car-card'>
                        <Image src={item.img} width={174} height={87} alt='car' />
                        <div className='popular-car-card-detail-container'>
                            <p>{item.name}</p>
                            <p>+info</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className='one-way-rental-detail-container'>
            <h3>ZM One-Way in your Car Rental</h3>
            <p>When it comes to exploring the breathtaking landscapes of New Zealand, there's no better way to get GOing than with a <strong> one-way rental </strong> from ZM Rentals.</p>
            <p>Fly into your chosen destination and pick up your one-way car hire, then embark on your adventure without the need to backtrack. Enjoy the picturesque charm of New Zealand at your own pace on the open road. When you've reached your final stop, simply drop off your one-way rental car.</p>
            <h3 className='one-way-rental-second-heading'>How to Book a One-Way Car Rental</h3>
            <p>Simply <strong> add your itinerary details </strong> to our booking widget, and choose your pick-up and return locations, and click "Find my car". We offer one-way car rentals at all of our 9 locations on both the South and North Islands. Please note:</p>
            <span>
                <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' />
                <p>Depending on the availability, a one-way rental fee between $100 - $1,000 may apply. The exact amount will be calculated on your booking summary before checkout.</p>
            </span>
            <span>
                <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' />
                <p>Depending on the availability, a one-way rental fee between $100 - $1,000 may apply. The exact amount will be calculated on your booking summary before checkout.</p>
            </span>
            <p>Our one-way rentals on our website booking are dependant on season peak times and car availability. If you do not find the availability you are looking for, please give us a call and we will do our best to find availability for your epic one-way road trip.</p>
        </div>
    </div>
  )
}

export default PopularCars